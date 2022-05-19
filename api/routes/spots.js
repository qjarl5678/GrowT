import express from "express";
import {isAuth} from "../../services/jwt.js";
import * as spotController from "../controllers/spotController.js";

const router = express.Router();

router.get("/", spotController.getSpotList);


export default router;