import { useEffect, useState } from "react";
import StationPicker from "./components/StationPicker.tsx";
import ArrivalBoard from "./components/ArrivalBoard.tsx";
import axios from "axios";
import type { DspArrival, DspStation } from "./types";
import { SERVER_API } from "./config.ts";

function App() {
  const [arrivals, setArrivals] = useState<DspArrival[]>([]);
  const [stations, setStations] = useState<DspStation[]>([]);
  const [hasArrivalError, setHasArrivalError] = useState(false);
  const [hasStationError, setHasStationError] = useState(false);
  const [hasEmptySelection, setHasEmptySelection] = useState(true);

  async function handleStationsChange(stationCodes: string) {
    if (!stationCodes) {
      setHasEmptySelection(true);
      return;
    }
    setHasEmptySelection(false);
    try {
      const response = await axios.get(
        `${SERVER_API}/arrivals/${stationCodes}`,
      );
      setHasArrivalError(false);
      setArrivals(response.data as DspArrival[]);
    } catch (err) {
      setHasArrivalError(true);
      console.error("error caught by client", err);
    }
  }

  useEffect(() => {
    async function getStations() {
      try {
        const response = await axios.get(`${SERVER_API}/stations`);
        setHasStationError(false);
        setStations(response.data as DspStation[]);
      } catch (error) {
        setHasStationError(true);
        console.error("Failed to fetch station list", error);
      }
    }
    getStations();
  }, []);

  return (
    <div className="form-section">
      <h2>Select a Station</h2>
      <StationPicker
        stations={stations}
        onStationChange={handleStationsChange}
        hasStationError={hasStationError}
      />
      <div className="results-section">
        <ArrivalBoard
          arrivals={arrivals}
          hasArrivalError={hasArrivalError}
          hasEmptySelection={hasEmptySelection}
        />
      </div>
    </div>
  );
}

export default App;
