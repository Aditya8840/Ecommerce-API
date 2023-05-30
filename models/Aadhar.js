const mongoose = require("mongoose")



//Aadhar Schema
const aadharSchema = new mongoose.Schema(
    {
        aadharNo: {type: String, required: true},
        aadharFront: {type: String, required: true},
        aadharBack: {type: String, required: true},
        userId: {type: String, required: true},
        status: {type: String, required: true, default: "pending"}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Aadhar", aadharSchema);