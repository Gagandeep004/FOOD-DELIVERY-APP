import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 4,
    },

    address: String,

    deliveryTime: String,
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);