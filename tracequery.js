import { trace } from '@opentelemetry/api';
import db from "./app-db.js";

export async function tracedQuery(pool, query, params = []) {
    // Start a custom span for the query
    const tracer = trace.getTracer('default');
    const span = tracer.startSpan('mysql.query', {
        attributes: {
            'db.system': 'mysql',
            'db.statement': query,
            'db.parameters': JSON.stringify(params),
        },
    });

    try {
        // Execute the query
        const result = await db.query(query, params);

        // Add result metadata if necessary (e.g., number of rows)
        span.setAttribute('db.rows_affected', result.affectedRows || 0);

        return result;
    } catch (error) {
        // Record exception
        span.recordException(error);
        span.setStatus({ code: 2, message: error.message }); // Status code 2 means "error"
        throw error;
    } finally {
        // End the span
        span.end();
    }
}