const mongoose = require("mongoose")



//Implement Schema
const implementSchema = new mongoose.Schema(
    {
        aadhar: {type: String},
        bank: {type: String},
        drivingLicense: {type: String},
        userId: {type: String, required: true, unique: true},
        status: {type: String, required: true, default: "pending"}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Implement", implementSchema);