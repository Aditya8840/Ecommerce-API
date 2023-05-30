const mongoose = require("mongoose")



//GST Schema
const gstSchema = new mongoose.Schema(
    {
        companyName: {type: String, required: true},
        cin: {type: String, required: true},
        gst: {type: String, required: true},
        pan: {type: String, required: true},
        userId: {type: String, required: true},
        status: {type: String, required: true, default: "pending"}
    },
    {timestamps: true}
);

module.exports = mongoose.model("GST", gstSchema);