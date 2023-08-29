import {object, string, TypeOf, number} from 'zod';

const payload = {
    body: object({
      lat: number({
        required_error: "lat is required",
      }).min(-90, 'latitude must atleast be greater than -90').max(90, 
        'latitude must be less than 90'),
      lon: number({
        required_error: "lon is required",
      }).min(-180, 'longitude must atleast be greater than -180').max(180,
        'longitude must be less than 180'),
    })
  };

  
  const params = {
    params: object({
      productId: string({
        required_error: "predictionId is required",
      }),
    }),
  };
  
  export const createCrimeTypeSchema = object({
    ...payload,
  });
  

  export type CreateCrimeTypeInput = TypeOf<typeof createCrimeTypeSchema>;