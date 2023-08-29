import mongoose from "mongoose";
import { userDocument } from "./user.model";


export interface ReportCrimeInput {
  user: userDocument["_id"];
  crimeType: string;
  date: string;
  time: string;
  location: string;
  notes: string;
}

export interface ReportCrimeDocument extends ReportCrimeInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const reportCrimeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    crimeType: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    notes: { type: String, },
  },
  {
    timestamps: true,
  }
);

const ReportCrimeModel = mongoose.model<ReportCrimeDocument>("ReportCrime", reportCrimeSchema);

export default ReportCrimeModel;