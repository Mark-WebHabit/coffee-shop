import express from "express";

// cotrollers
import { getSingleUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getSingleUser);

export default router;
