import { Request, Response } from "express";

import {
    CreateCrimeFreqInput
} from "../schema/crimeFreq.schema";

import {
    createCrimeFreq
} from "../service/crimeFreq.service";

export async function createCrimeFreqHandler(
  req: Request<{}, {}, CreateCrimeFreqInput["body"]>,
  res: Response
) {

  // validate user request
  const userId = res.locals.user._id;

  const body = req.body;

  const prediction = await createCrimeFreq({ ...body });

  return res.send(prediction);
}