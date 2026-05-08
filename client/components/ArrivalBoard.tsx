import type { DspArrival } from "../types.ts";

interface ArrivalBoardProps {
  arrivals: DspArrival[];
  hasArrivalError: boolean;
  hasEmptySelection: boolean;
}

const ArrivalBoard = ({
  arrivals,
  hasArrivalError,
  hasEmptySelection,
}: ArrivalBoardProps) => {
  if (hasEmptySelection) return null;
  if (hasArrivalError) {
    return (
      <div className="error-message">
        An error occurred while retrieving arrivals for this station. Please try
        again.
      </div>
    );
  }
  if (arrivals.length === 0) {
    return <div>No arrivals for this station.</div>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Destination</th>
          <th>Line</th>
          <th>Cars</th>
          <th>Track</th>
          <th>Minutes</th>
        </tr>
      </thead>
      <tbody>
        {arrivals.map((arrival) => (
          <tr key={`${arrival.destination}-${arrival.line}-${arrival.minutes}`}>
            <td>{arrival.destination}</td>
            <td>{arrival.line}</td>
            <td>{arrival.cars}</td>
            <td>{arrival.track}</td>
            <td>{arrival.minutes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArrivalBoard;
