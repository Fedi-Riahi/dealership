import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarModel', // Reference to the CarModel collection
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);

module.exports = Quote;
