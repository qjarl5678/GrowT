import express from "express";
import * as mainController from "../controllers/mainController.js";

const router = express.Router();
router.get("/", mainController.mainView);
export default router;
