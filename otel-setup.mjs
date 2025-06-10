import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { MySQL2Instrumentation } from '@opentelemetry/instrumentation-mysql2';

// Set up Splunk OTLP exporter
const traceExporter = new OTLPTraceExporter({
    url: 'https://ingest.us1.signalfx.com/v2/traces',
    headers: {
        'Authorization': 'Splunk szbjLgucNE2S1dlQdlz_2w',
    },
});

// Initialize tracer provider
const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter())); // For debugging
provider.register();

// Instrument MySQL2
registerInstrumentations({
    instrumentations: [
        new MySQL2Instrumentation(),
    ],
    tracerProvider: provider,
});

console.log('OpenTelemetry and MySQL2 instrumentation initialized');
