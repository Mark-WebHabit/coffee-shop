import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const verifyToken = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    // If there is no user session, return Unauthorized
    return res
      .status(401)
      .json({ message: "Unauthorized: User session not found" });
  }

  // Get the JWT token from the cookie
  const token = req.cookies.jwt;

  if (!token) {
    // If there is no access token found in the cookie, return Unauthorized
    return res
      .status(401)
      .json({ message: "Unauthorized: No access token found" });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.log(`Invalid access token: ${err.message}`);
      // Access token is no longer valid
      // Call the refresh endpoint to get a new token

      try {
        const refreshResponse = await axios.post(
          "http://localhost:800/token/refresh"
        );

        // New access token obtained from the refresh
        const newToken = refreshResponse.data.accessToken;
        console.log(`New access token obtained: ${newToken}`);

        // Set the new token in a cookie
        res.cookie("jwt", newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        // Retry token verification with the new access token
        jwt.verify(
          newToken,
          process.env.ACCESS_TOKEN_SECRET,
          (err, decoded) => {
            if (err) {
              return res.status(403).json({
                message: "Access denied: New token verification failed",
              });
            }

            req.user = decoded.user;
            next();
          }
        );
      } catch (refreshError) {
        return res
          .status(403)
          .json({ message: "Access denied: Token refresh failed" });
      }
    }

    req.user = decoded.user;
    next();
  });
});
