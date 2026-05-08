// This file contains the same types as server/types.ts.
// We will need to use a monorepo or other mechanism to prevent this duplication
export interface DspStation {
  name: string;
  lines: string[];
  stationCodes: string;
}

export interface DspArrival {
  destination: string;
  line: string;
  minutes: string;
  track: string;
  cars: string;
}
