// models/CarModel.js
import mongoose from 'mongoose';

const carModelSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarBrand',
    required: true,
  },
  listingTitle: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ['New', 'Used'],
    required: true,
  },
  type: {
    type: String,
    enum: ['Convertible', 'Coupe', 'Hatchback', 'Sedan', 'SUV', 'Wagon'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  driveType: {
    type: String,
    enum: ['AWD/4WD', 'Front wheel drive', 'Rear wheel drive'],
    required: true,
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual', 'Semi-Automatic'],
    required: true,
  },
  fuelType: {
    type: String,
    enum: ['Diesel', 'Petrol', 'Electric', 'Hybrid'],
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  engineSize: {
    type: Number,
    required: true,
  },
  cylinders: {
    type: Number,
    enum: [4, 5, 6, 8, 9, 10],
    required: true,
  },
  color: {
    type: String,
    enum: ['Red', 'Blue', 'Green', 'White', 'Black', 'Silver', 'Gray', 'Other','Purple'],
    required: true,
  },
  doors: {
    type: Number,
    enum: [2, 4],
    required: true,
  },
  VIN: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // Assuming image URLs are stored as strings
  }],
  description: {
    type: String,
  },
  features: [{
    type: String,
    enum: [
      '360-degree camera', 'Blind spot alert', 'Bluetooth', 'Cooled seats',
      'Heated seats', 'Keyless start', 'Leather seats', 'LED headlights',
      'Memory seat', 'Navigation System', 'Reversing camera', 'Side airbags',
      'Sound system', 'Traction Control', 'USB port',
    ],
  }],
  safetyFeatures: [{
    type: String,
    enum: [
      'Active head restraints', 'Adaptive headlights', 'Backup camera',
      'Blind-spot warning', 'Brake assist', 'Forward-collision warning',
      'Lane keeping assist', 'Parking assist systems', 'Pedestrian detection',
      'Sideview camera',
    ],
  }],
}, { timestamps: true });

const CarModel = mongoose.models.CarModel || mongoose.model('CarModel', carModelSchema);

export default CarModel;
