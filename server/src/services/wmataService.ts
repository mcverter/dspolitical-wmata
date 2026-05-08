import { DspArrival, DspStation } from "../types";
import { allStationsMapper, allArrivalsMapper } from "../models/wmataModel";
import httpClient from "./httpClientService";
import cache from "./cacheService";
import { WMATA_BASE_URL } from "../config";
import { arrivalsBreaker, stationsBreaker } from "./circuitBreakerService";

class WmataService {
  private readonly apiKey: string;

  constructor(apiKey: string = process.env.WMATA_API_KEY || "") {
    this.apiKey = apiKey;
  }

  async fetchStations(): Promise<DspStation[]> {
    const cacheKey = "stations";
    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }
    const response = await stationsBreaker.fire(() =>
      httpClient.get(`${WMATA_BASE_URL}/Rail.svc/json/jStations`, {
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKey,
        },
      }),
    );
    // @ts-expect-error response contains "data.Stations"
    const stations = allStationsMapper(response.data.Stations);
    cache.put(cacheKey, stations, 6 * 60 * 60 * 1000);
    return stations;
  }

  async fetchArrivals(stationCodes: string): Promise<DspArrival[]> {
    const cacheKey = `arrivals-${stationCodes}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await arrivalsBreaker.fire(() =>
      httpClient.get(
        `${WMATA_BASE_URL}/StationPrediction.svc/json/GetPrediction/${stationCodes}`,
        {
          headers: {
            "Content-Type": "application/json",
            API_KEY: this.apiKey,
          },
        },
      ),
    );
    // @ts-expect-error response contains "data.Trains"
    const arrivals = allArrivalsMapper(response.data.Trains);
    cache.put(cacheKey, arrivals, 20 * 1000);
    return arrivals;
  }
}

export default new WmataService();
