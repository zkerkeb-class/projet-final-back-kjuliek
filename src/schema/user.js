import mongoose from "mongoose";

import colonyTrackingSchema from './colonyTracking.js';

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true, 
    },
    mail: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    colonies: [colonyTrackingSchema]
});

export default mongoose.model("User", userSchema);