const mongoose = require("mongoose")



//Certificate Schema
const certificateSchema = new mongoose.Schema(
    {
        certificateNo: {type: String, required: true},
        certificate: {type: String, required: true},
        userId: {type: String, required: true},
        status: {type: String, required: true, default: "pending"}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Certificate", certificateSchema);