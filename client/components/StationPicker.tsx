import type { DspStation } from "../types.ts";

interface StationsPickerProps {
  stations: DspStation[];
  onStationChange: (name: string) => void;
  hasStationError: boolean;
}

const StationPicker = ({
  stations,
  onStationChange,
  hasStationError,
}: StationsPickerProps) => {
  if (hasStationError) return <div>Unable to load stations</div>;
  return (
    <div>
      <select onChange={(e) => onStationChange(e.target.value)}>
        <option value="">Please select a station</option>
        {import.meta.env.DEV && (
          <option value="==error==">Throw Error Junction (Oh no!)</option>
        )}
        {stations.map((station) => (
          <option value={`${station.stationCodes}`} key={`${station.name}`}>
            {station.name} ({`${station.lines.join(", ")}`})
          </option>
        ))}
      </select>
    </div>
  );
};

export default StationPicker;
