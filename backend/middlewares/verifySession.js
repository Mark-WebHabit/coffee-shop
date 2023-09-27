import asyncHandler from "express-async-handler";

export const verifySession = asyncHandler(async (req, res, next) => {
  const userId = req.session.userId;
  const isAuthenticated = req.session.authenticated;

  if (!userId) {
    return res.status(401).json({ message: "No user logged in" });
  } else if (userId && !isAuthenticated) {
    return res.status(403).json({ message: "Your are not allowed here" });
  }
  next();
});
