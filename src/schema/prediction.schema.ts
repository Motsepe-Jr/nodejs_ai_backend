import {object, string, TypeOf, number} from 'zod';


const payload = {
    body: object({
      place: string({
        required_error: "Place is required",
      }),
      population: number({
        required_error: "Population is required",
      }),
      area: number({
        required_error: "Area is required",
      }),
      lat: number({
        required_error: "lat is required",
      }),
      lon: number({
        required_error: "lon is required",
      }),
    }),
  };
  
  const params = {
    params: object({
      productId: string({
        required_error: "predictionId is required",
      }),
    }),
  };
  
  export const createPredictionSchema = object({
    ...payload,
  });
  
  // export const updateProductSchema = object({
  //   ...payload,
  //   ...params,
  // });
  
  // export const deleteProductSchema = object({
  //   ...params,
  // });
  
  // export const getProductSchema = object({
  //   ...params,
  // });
  
  export type CreatePredictionInput = TypeOf<typeof createPredictionSchema>;
  // export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
  // export type ReadProductInput = TypeOf<typeof getProductSchema>;
  // export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;