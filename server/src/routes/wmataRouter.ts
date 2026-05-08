import express from "express";
import wmataController from "../controllers/wmataController";

const router = express.Router();

router.get("/stations", wmataController.getStations);
router.get("/arrivals/:stationCodes", wmataController.getArrivals);

export default router;
