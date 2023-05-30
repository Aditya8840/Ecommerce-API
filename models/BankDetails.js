const mongoose = require("mongoose")



//Bank Schema
const bankDetailsSchema = new mongoose.Schema(
    {
        bankAc: {type: String, required: true},
        bankIfsc: {type: String, required: true},
        bankName: {type: String, required: true},
        AcHolderName: {type: String, required: true},
        AcPassbook: {type: String, required: true},
        userId: {type: String, required: true},
        status: {type: String, required: true, default: "pending"}
    },
    {timestamps: true}
);

module.exports = mongoose.model("BankDetails", bankDetailsSchema);