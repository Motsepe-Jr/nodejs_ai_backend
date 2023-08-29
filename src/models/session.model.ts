

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import validate from '../middleware/validateResource';
import { BlockList } from "net";
import { userDocument } from "./user.model";



export interface SessionDocument  extends  mongoose.Document { 
     
    user: userDocument['_id'],
    valid: boolean;
    userAgent: string;
    createdAt: Date,
    updatedAt: Date,
}

const sessionSchema = new mongoose.Schema({ 
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    valid: {type: Boolean, default: true},
    userAgent: {type: String}
}, {
    timestamps: true
}
);


const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema)

export default SessionModel;