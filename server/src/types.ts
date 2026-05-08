// This file contains the same Dsp types as client/types.ts.
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

interface Address {
  City: string;
  State: string;
  Street: string;
  Zip: string;
}

export interface WmataStation {
  Address: Address;
  Code: string;
  Lat: number;
  LineCode1: string;
  LineCode2: string | null;
  LineCode3: string | null;
  LineCode4: string | null;
  Lon: number;
  Name: string;
  StationTogether1: string | null;
  StationTogether2: string | null;
}

export interface WmataArrival {
  Car: string | null;
  Destination: string;
  DestinationCode: string | null;
  DestinationName: string | null;
  Group: string | null;
  Line: string | null;
  LocationCode: string;
  LocationName: string | null;
  Min: string | null;
}
