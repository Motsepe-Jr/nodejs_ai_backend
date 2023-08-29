import {object, string, TypeOf} from 'zod';


const payload = {
    body: object({
     crimeType: string({
        required_error: "Crime Type is Required",
      }),
      notes: string({
      }).max(350, "Additional Notes should not be greater thab 350 characters"),
      time: string({
        required_error: "Time of Crime Event is Required",
      }),
      date: string({
        required_error: "Day of Crime Event is Required",
      }),
      location: string({
        required_error: "Location of Crime Event is Required",
      }),
    }),
  };
  
  export const createReportCrimeSchema = object({
    ...payload,
  });
  
 
  export type createReportCrimeInput = TypeOf<typeof createReportCrimeSchema>;
