// models/CarBrand.js
import mongoose from 'mongoose';

const carBrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  models: [{
    type: String,
  }],
  coverImage:[{
    type: String, // Assuming image URLs are stored as strings
  }],
}, { timestamps: true });

const CarBrand = mongoose.models.CarBrand || mongoose.model('CarBrand', carBrandSchema);

export default CarBrand;
