import mongoose from 'mongoose';

const { Schema } = mongoose;

const tourSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  images: {
    type: [String],
    default: [],
    required: true,
  },


  overview: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },

  altitude: {
    type: String,
    required: true,
  },

  ageLimit: {
    type: String,
    required: true,
  },

  highlights: {
    type: [String],
    default: [],
    required: true,
  },


  itinerary: {
    type: [String],
    default: [],
    required: true,
  },





  facilities: {
    type: [String],
    default: [],
    required: true,
  },
  
  inclusions: {
    type: [String],
    default: [],
    required: true,
  },
  note: {
    type: [String],
    default: [],
    required: true,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
