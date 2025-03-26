import mongoose from "mongoose";

const CafeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        logoUrl: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Cafe", CafeSchema);
