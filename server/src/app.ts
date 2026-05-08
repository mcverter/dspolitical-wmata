import "./services/telemetryService";

import "dotenv/config";
import express from "express";
import wmataRoutes from "./routes/wmataRouter";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { limiter } from "./middleware/rateLimiter";
import pinoHttp from "pino-http";
import { PORT } from "./config";

const app = express();
const commonRoutePrefix = "/api/v1";
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(pinoHttp());
app.use(`${commonRoutePrefix}/wmata`, wmataRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server listening for connections on ${PORT}`);
});
