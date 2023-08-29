import mongoose from "mongoose";
import { userDocument } from "./user.model";

export interface PredictionInput {
  user: userDocument["_id"];
  place: string;
  population: Number;
  area: Number;
  lat: Number;
  lon: Number;
}

export interface PredictionDocument extends PredictionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const predictionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    place: { type: String, required: true },
    population: { type: Number, required: true },
    area: { type: Number, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"], 
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  {
    timestamps: true,
  }
);

predictionSchema.index({ location: "2dsphere" });


// predictionSchema.pre("save", function (next) {
//   this.location = {
//     type: "Point",
//     coordinates: [this.lon, this.lat], 
//   };
//   next();
// });

const PredictionModel = mongoose.model<PredictionDocument>(
  "PredictionFeatures",
  predictionSchema
);

export default PredictionModel;
