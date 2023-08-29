import { Request, Response } from "express";

import {
    CreateCrimeDensityInput
} from "../schema/crimeDensity.schema";

import {
    createCrimeDensity
} from "../service/crimeDensity.service";

export async function createCrimeDensityHandler(
  req: Request<{}, {}, CreateCrimeDensityInput["body"]>,
  res: Response
) {

  // validate user request
  const userId = res.locals.user._id;

  const body = req.body;

  const prediction = await createCrimeDensity({ ...body });

  return res.send(prediction);
}