import express from "express";
import {isAuth} from "../../services/jwt.js";
import spotController from "../controllers/spotController.js";

const router = express.Router();

router.get("/", spotController.getSpotList);