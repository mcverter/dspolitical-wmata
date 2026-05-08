import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "http://d8dawg.woof/dspolitical-wmata",
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: "dspolitical-wmata",
});

sdk.start();
