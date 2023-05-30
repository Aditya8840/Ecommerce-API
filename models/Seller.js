const mongoose = require("mongoose")



//Seller Schema
const sellerSchema = new mongoose.Schema(
    {
        aadhar: {type: String},
        bank: {type: String},
        gst: {type: String},
        userId: {type: String, required: true, unique: true},
        status: {type: String, required: true, default: "pending"}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Seller", sellerSchema);