import express, {Response, Request} from "express";
import deserializeUser from '../middleware/deserialiseUser';
import routes from '../routes';
import { restResponseTimeHistogram, startMetricsServer } from '../utils/metrics';
import responseTime from 'response-time';

function createServer() {
    
    const app = express();
    app.use(express.json());
    app.use(deserializeUser);

    app.use(responseTime((req: Request, res: Response, time:number) => {
        if(req?.route.path) {
            restResponseTimeHistogram.observe({
                method: req.method,
                route: req.route.path,
                status_code: res.statusCode
            }, 
            time / 1000 // seconds
            )
        }
    }));

    routes(app);
    startMetricsServer();

    return app

}

export default createServer