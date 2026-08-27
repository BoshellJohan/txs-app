import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';

const sdk = new NodeSDK({
  serviceName: process.env.OTEL_SERVICE_NAME ?? 'txs-api',
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// BatchSpanProcessor acumula los spans y los descarga cada 5s, asi que sin
// esto se pierde lo pendiente al cerrar el proceso.
for (const signal of ['SIGTERM', 'SIGINT'] as const) {
  process.once(signal, () => {
    sdk.shutdown().finally(() => process.exit(0));
  });
}
