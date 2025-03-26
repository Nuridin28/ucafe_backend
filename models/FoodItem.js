import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema(
    {
        cafe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cafe",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("FoodItem", FoodItemSchema);
