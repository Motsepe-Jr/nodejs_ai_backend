import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ReportCrimeModel, { ReportCrimeDocument, ReportCrimeInput } from '../models/reportCrime.model';
import { databaseresponseTimeHistogram } from "../utils/metrics";


export async function createReportCrime(input: ReportCrimeInput) {
  
  const metricsLables = {
    operation:'createReportCrime'
  }
  const timer = databaseresponseTimeHistogram.startTimer();
  
  try {

    const result = await ReportCrimeModel.create(input);

    timer({...metricsLables, success:"true" })
    return {
      success: true,
      message: 'success',
      result
    };
  } catch (e) {
    timer({...metricsLables, success:"false"})
    return  {
      success: false,
      message: 'could not report your crime'
    }
  }
}
