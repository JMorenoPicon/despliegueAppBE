import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  nationality: { type: String, required: true },
  points: { type: Number, default: 0 },
});

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
