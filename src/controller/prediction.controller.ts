import { Request, Response } from "express";
import {
  CreatePredictionInput
} from "../schema/prediction.schema";
import {
  createPrediction
} from "../service/prediction.service";

export async function createPredictionHandler(
  req: Request<{}, {}, CreatePredictionInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const prediction = await createPrediction({ ...body, user: userId });

  return res.send(prediction);
}

// export async function updateProductHandler(
//   req: Request<UpdateProductInput["params"]>,
//   res: Response
// ) {
//   const userId = res.locals.user._id;

//   const productId = req.params.productId;
//   const update = req.body;

//   const product = await findProduct({ productId });

//   if (!product) {
//     return res.sendStatus(404);
//   }

//   if (String(product.user) !== userId) {
//     return res.sendStatus(403);
//   }

//   const updatedProduct = await findAndUpdateProduct({ productId }, update, {
//     new: true,
//   });

//   return res.send(updatedProduct);
// }

// export async function getProductHandler(
//   req: Request<UpdateProductInput["params"]>,
//   res: Response
// ) {
//   const productId = req.params.productId;
//   const product = await findProduct({ productId });

//   if (!product) {
//     return res.sendStatus(404);
//   }

//   return res.send(product);
// }

// export async function deleteProductHandler(
//   req: Request<UpdateProductInput["params"]>,
//   res: Response
// ) {
//   const userId = res.locals.user._id;
//   const productId = req.params.productId;

//   const product = await findProduct({ productId });

//   if (!product) {
//     return res.sendStatus(404);
//   }

//   if (String(product.user) !== userId) {
//     return res.sendStatus(403);
//   }

//   await deleteProduct({ productId });

//   return res.sendStatus(200);
// }