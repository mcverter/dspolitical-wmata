import CircuitBreaker from "opossum";

const wrap = <T>(fn: () => Promise<T>) => fn();
const opts = {
  timeout: 10000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
  volumeThreshold: 5,
};
export const stationsBreaker = new CircuitBreaker(wrap, opts);
export const arrivalsBreaker = new CircuitBreaker(wrap, opts);
