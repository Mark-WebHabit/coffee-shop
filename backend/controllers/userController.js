import asyncHandler from "express-async-handler";

// model
import { Users } from "../Model/Users.js";

// GET SINGLE USER - POST
// ENDPOINT: /user/:id
// @private-access

export const getSingleUser = asyncHandler(async (req, res) => {
  const id = req.session.userId;

  //   if id parameter is not found or falsy
  if (!id) {
    return res.status(400).json({ message: "No user logged in" });
  }

  //   check if id is valid
  const IdOwner = await Users.findById(id).select("-password -refreshToken");
  if (!IdOwner) {
    // if id is not found in the db
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ data: IdOwner });
});
