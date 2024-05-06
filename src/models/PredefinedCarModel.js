// models/PredefinedCarModel.js
import mongoose from 'mongoose';

const predefinedCarModelSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarBrand',
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const PredefinedCarModel = mongoose.models.PredefinedCarModel || mongoose.model('PredefinedCarModel', predefinedCarModelSchema);

export default PredefinedCarModel;
