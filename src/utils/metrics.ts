import express from 'express';
import client from 'prom-client';
import log from './logger';

const app = express();

const PORT = 9000

export const restResponseTimeHistogram = new client.Histogram({
    name: 'rest_response_time_duration_seconds',
    help: 'REST API response time in seconds',
    labelNames: ['method', 'route', 'status_code']
})


export const  databaseresponseTimeHistogram = new client.Histogram({
    name: 'db_response_time_duration_seconds',
    help: 'Database API response time in seconds',
    labelNames: ['operation', 'success',]

})


export function startMetricsServer() {

    const collectDefaultMetrics = client.collectDefaultMetrics;

    collectDefaultMetrics();

    app.get('/metrics', async (req, res) => {

        res.set('Content-Type', client.register.contentType)

        return res.send(await client.register.metrics())
    })

    app.listen(PORT, () => {
        log.info(`Metrics server listening at http://localhost:${PORT}`)
    })
}

