import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// model
import { Users } from "../Model/Users.js";

// REFRESH TOKEN - POST
// endpoint - /token/refresh
const refreshToken = asyncHandler(async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    // If no user session is detected, return Unauthorized
    return res
      .status(401)
      .json({ message: "Unauthorized: User session not found" });
  }

  // Get the user with the specified ID from the database
  const user = await Users.findById(userId);

  if (!user) {
    // If no user is matched in the database, return Not Found
    return res.status(404).json({ message: "Not Found: No user found" });
  }

  if (!user?.refreshToken) {
    // If a user is found but no refresh token is associated, return Not Found
    return res
      .status(404)
      .json({ message: "Not Found: Refresh token not found for the user" });
  }

  // Verify the refresh token
  jwt.verify(
    user.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        // If the refresh token is invalid, return Forbidden
        return res
          .status(403)
          .json({ message: "Forbidden: Invalid refresh token" });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      // Return the new access token
      res.json({ accessToken: newAccessToken });
    }
  );
});

export { refreshToken };
