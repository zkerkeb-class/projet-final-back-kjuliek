import mongoose from 'mongoose';

const colonyTrackingSchema = new mongoose.Schema({
  colonyName: { type: String, required: true },
  speciesName: { type: String, required: true },
  individualCount: { type: Number, required: true },
  lastFeeding: { type: Date, required: true },
  lastHumidity: { type: Date, required: true }
});

export default colonyTrackingSchema;