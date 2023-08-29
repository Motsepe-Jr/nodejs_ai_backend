import { Request, Response } from "express";

import {
    CreateCrimeTypeInput
} from "../schema/crimeType.schema";

import {
    createCrimeType
} from "../service/crimeType.service";

export async function createCrimeTypeHandler(
  req: Request<{}, {}, CreateCrimeTypeInput["body"]>,
  res: Response
) {

  // validate user request
  const userId = res.locals.user._id;

  const body = req.body;

  const prediction = await createCrimeType({ ...body });

  return res.send(prediction);
}