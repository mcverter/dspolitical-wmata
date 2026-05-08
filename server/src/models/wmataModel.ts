import { DspArrival, DspStation, WmataArrival, WmataStation } from "../types";

const AbbrevToLineColor: Record<string, string> = {
  RD: "Red",
  BL: "Blue",
  YL: "Yellow",
  OR: "Orange",
  GR: "Green",
  SV: "Silver",
};

function abbrevToLineColor(abbrev: string | null): string {
  return typeof abbrev === "string" && AbbrevToLineColor[abbrev]
    ? AbbrevToLineColor[abbrev]
    : "";
}
function convertMin(wmataMin: string): string {
  switch (wmataMin) {
    case "ARR":
      return "Arriving";
    case "BRD":
      return "Boarding";
    case "1":
      return "1 minute";
    default:
      return `${wmataMin} minutes`;
  }
}

function arrivalMapper(arrival: WmataArrival): DspArrival {
  return {
    destination: arrival.DestinationName
      ? arrival.DestinationName
      : arrival.Destination,
    line: arrival.Line ? abbrevToLineColor(arrival.Line) : "",
    minutes: arrival.Min ? convertMin(arrival.Min) : "",
    track: arrival.Group || "",
    cars: arrival.Car ? arrival.Car : "",
  };
}
function allArrivalsMapper(arrivals: WmataArrival[]): DspArrival[] {
  return arrivals.map((train: WmataArrival) => arrivalMapper(train));
}

function stationMapper(station: WmataStation): DspStation {
  const lines = [
    station.LineCode1,
    station.LineCode2,
    station.LineCode3,
    station.LineCode4,
  ]
    .filter((line) => Boolean(line))
    .map((line) => abbrevToLineColor(line));
  const stationCodes = [
    station.Code,
    station.StationTogether1,
    station.StationTogether2,
  ]
    .filter((s) => Boolean(s))
    .join(",");
  return {
    name: station.Name,
    lines,
    stationCodes,
  } as DspStation;
}

function allStationsMapper(stations: WmataStation[]): DspStation[] {
  const seen = new Set<string>();
  return stations
    .reduce((acc: DspStation[], station: WmataStation) => {
      if (!seen.has(station.Name)) {
        seen.add(station.Name);
        return [...acc, stationMapper(station)];
      }
      return acc;
    }, [])
    .sort((s1, s2) => s1!.name.localeCompare(s2!.name));
}

export { allArrivalsMapper, allStationsMapper };
