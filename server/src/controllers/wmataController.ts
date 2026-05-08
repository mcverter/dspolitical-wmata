import { Request, Response, NextFunction } from "express";
import wmataService from "../services/wmataService";

class WmataController {
  async getStations(_req: Request, res: Response, next: NextFunction) {
    try {
      const stations = await wmataService.fetchStations();
      res.status(200).json(stations);
    } catch (error) {
      next(error);
    }
  }

  async getArrivals(req: Request, res: Response, next: NextFunction) {
    try {
      const stationCodes = req.params.stationCodes;
      if (
        !stationCodes ||
        !/^[A-Z]\d\d(,[A-Z]\d\d)*$/.test(stationCodes as string)
      ) {
        return res.status(400).json({ error: "Invalid station codes" });
      }
      const arrivals = await wmataService.fetchArrivals(stationCodes as string);
      res.status(200).json(arrivals);
    } catch (error) {
      next(error);
    }
  }
}

export default new WmataController();
