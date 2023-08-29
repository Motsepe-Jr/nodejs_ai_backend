import { Request, Response } from "express";
import { createReportCrime } from "../service/reportCrime.service";
import { createReportCrimeInput } from "../schema/reportCrime.schema";

export async function createReportCrimeHandler(
    req: Request<{}, {}, createReportCrimeInput["body"]>,
    res: Response
  ) {
    const userId = res.locals.user._id;
  
    const body = req.body;
  
    const crimeReport = await createReportCrime({ ...body, user: userId });
  
    return res.send(crimeReport);
  }
  