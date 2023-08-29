import { Express, Request, Response } from "express";

import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler, getUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requiresUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/sessions.schema";
import { createUserSchema } from "./schema/user.schema";

import {
    createPredictionHandler,
  } from "./controller/prediction.controller";

  import {
    createPredictionSchema,
  } from "./schema/prediction.schema";

import { createReportCrimeSchema } from "./schema/reportCrime.schema";
import { createReportCrimeHandler } from "./controller/reportCrime.controller";
import { createCrimeDensitySchema } from "./schema/crimeDensity.schema";
import { createCrimeDensityHandler } from "./controller/crimeDensity.controller";
import { createCrimeTypeSchema } from "./schema/crimeType.schema";
import { createCrimeTypeHandler } from "./controller/crimeType.controller";
import { createCrimeFreqSchema } from "./schema/crimeFreq.schema";
import { createCrimeFreqHandler } from "./controller/crimeFreq.controller";

function routes(app: Express) {
   
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  
    app.post("/api/register", 
           validateResource(createUserSchema), 
           createUserHandler);
  
    app.post(
      "/api/login",
      validateResource(createSessionSchema),
      createUserSessionHandler
    );
  
    app.get("/api/sessions", requireUser, getUserSessionsHandler);
  
    app.delete("/api/sessions", requireUser, deleteSessionHandler);
  
    app.post(
      "/api/createPredictionFeatures",
      [requireUser, validateResource(createPredictionSchema)],
      createPredictionHandler
    );

    app.post(
      "/api/createCrimeDensity",
      [requireUser, validateResource(createCrimeDensitySchema)],
      createCrimeDensityHandler
    );

    app.post(
      "/api/createCrimeType",
      [requireUser, validateResource(createCrimeTypeSchema)],
      createCrimeTypeHandler
    );

    app.post(
      "/api/createCrimeFreq",
      [requireUser, validateResource(createCrimeFreqSchema)],
      createCrimeFreqHandler
    );
  

    app.post(
      "/api/reportCrime",
      [requireUser, validateResource(createReportCrimeSchema)],
      createReportCrimeHandler
    );

    app.get("/api/me", requireUser, getUserHandler);

  }
  
  export default routes;