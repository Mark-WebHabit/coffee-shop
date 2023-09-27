import express from "express";
import { refreshToken } from "../controllers/refreshTokenControlelr.js";

const router = express.Router();

router.post("/refresh", refreshToken);

export default router;
