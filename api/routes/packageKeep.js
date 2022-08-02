import express from "express";
import * as packageKeepController from "../controllers/packageKeepController.js";

const router = express.Router();

router.get("/write", packageKeepController.getPackageKeepWritePage)


export default router;
