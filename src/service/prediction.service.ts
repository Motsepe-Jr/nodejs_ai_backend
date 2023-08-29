import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PredictionModel, {
  PredictionDocument, PredictionInput,
} from "../models/prediction.model";

export async function createPrediction(input: PredictionInput) {
  
  try {
    const result = await PredictionModel.create(input);
    return result;
  } catch (e) {
    throw e;
  }
}

// export async function findProduct(
//   query: FilterQuery<ProductDocument>,
//   options: QueryOptions = { lean: true }
// ) {
//   try {
//     const result = await ProductModel.findOne(query, {}, options);
//     return result;
//   } catch (e) {
//     throw e;
//   }
// }

// export async function findAndUpdateProduct(
//   query: FilterQuery<ProductDocument>,
//   update: UpdateQuery<ProductDocument>,
//   options: QueryOptions
// ) {
//   return ProductModel.findOneAndUpdate(query, update, options);
// }

// export async function deleteProduct(query: FilterQuery<ProductDocument>) {
//   return ProductModel.deleteOne(query);

// }