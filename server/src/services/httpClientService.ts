import axios from "axios";
import axiosRetry from "axios-retry";

const httpClient = axios.create();

axiosRetry(httpClient, {
  retries: 3,
  retryCondition: (error) => {
    const status = error.response ? error.response.status : null;
    return (
      status === 408 ||
      status === 429 ||
      (status !== null && status >= 500 && status <= 599)
    );
  },
  retryDelay: (retryCount, error) => {
    const retryAfter = error.response?.headers["retry-after"];
    if (retryAfter) {
      return parseInt(retryAfter) * 1000;
    }
    return axiosRetry.exponentialDelay(retryCount);
  },
});

export default httpClient;
