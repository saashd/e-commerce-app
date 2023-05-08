const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        rating: {type: Number, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        description: {type: String, required: true},
        productId: {type: String, required: true},
        helpful: {type: Number},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Review", ReviewSchema);
