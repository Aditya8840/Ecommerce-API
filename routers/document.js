const { verifyTokenAndAuth, verifyToken } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const VLC = require("../models/VLC");
const Seller = require("../models/Seller");
const Wholeseller = require("../models/Wholeseller");
const Retailer = require("../models/Retailer");
const Implement = require("../models/Implement");
const LabourProvider = require("../models/LabourProvider");
const Aadhar = require("../models/Aadhar");
const BankDetails = require("../models/BankDetails");
const Certificate = require("../models/Certificate");
const router = require("express").Router()


router.post("/aadhar", verifyToken, async (req, res) => {
    try {
      // Create a new Aadhaar
        const aadhaar = new Aadhar({
            aadharNo: req.body.aadharNo,
            aadharFront: req.body.aadharFront,
            aadharBack: req.body.aadharBack,
            userId: req.user.id,
            status: "pending",
        });

        // Save the Aadhaar
        await aadhaar.save();
        
        // Get the ID of the Aadhaar
        const id = aadhaar._id;

        const user = await User.findById(req.user.id)

        // Get the user roles
        const userRoles = await user.userrole;

        console.log(userRoles);

        // Iterate in the user roles
        for (const userRole of userRoles) {
            // Iterate in the roles
            if(userRole.role == "vlc"){
                const vlc = await VLC.findOneAndUpdate({userId: req.user.id}, {$set: {aadhar: id}}, {new: true})
            }else if(userRole.role == "seller"){
                const seller = await Seller.findOneAndUpdate({userId: req.user.id}, {$set: {aadhar: id}}, {new: true})
            }else if(userRole.role == "wholeseller"){
                const wholeseller = await Wholeseller.findOneAndUpdate({userId: req.user.id}, {$set: {aadhar: id}}, {new: true})
            }else if(userRole.role == "retailer"){
                const retailer = await Retailer.findOneAndUpdate({userId: req.user.id}, {$set: {aadhar: id}}, {new: true})
            }else if(req.body.role == "implement"){
                const implement = await Implement.findOneAndUpdate({userId: req.user.id}, {$set: {aadhar: id}}, {new: true})
            }else if(userRole.role == "labourprovider"){
                const labourprovider = await LabourProvider.findOneAndUpdate({userId: req.user.id}, {$set: {aadhar: id}}, {new: true})
            }
        }
        
        // Return the Aadhaar
        res.status(200).json({"response": "200","message": "In review"});
    } catch (err) {
      console.log(err);
      return res.status(500).json({ "response": "500","message": "Internal Server Error" });
    }
  });



  router.post("/bankdetail", verifyToken, async (req, res) => {
    try {
      // Create a new Aadhaar
        const bank = new BankDetails({
            bankAc: req.body.bankAc,
            bankIfsc: req.body.bankIfsc,
            bankName: req.body.bankName,
            AcHolderName: req.body.AcHolderName,
            AcPassbook: req.body.AcPassbook,
            userId: req.user.id,
            status: "pending",
        });

        // Save the Aadhaar
        await bank.save();
        
        // Get the ID of the Aadhaar
        const id = bank._id;

        const user = await User.findById(req.user.id)

        // Get the user roles
        const userRoles = await user.userrole;

        console.log(userRoles);

        // Iterate in the user roles
        for (const userRole of userRoles) {
            // Iterate in the roles
            if(userRole.role == "vlc"){
                const vlc = await VLC.findOneAndUpdate({userId: req.user.id}, {$set: {bank: id}}, {new: true})
            }else if(userRole.role == "seller"){
                const seller = await Seller.findOneAndUpdate({userId: req.user.id}, {$set: {bank: id}}, {new: true})
            }else if(userRole.role == "wholeseller"){
                const wholeseller = await Wholeseller.findOneAndUpdate({userId: req.user.id}, {$set: {bank: id}}, {new: true})
            }else if(userRole.role == "retailer"){
                const retailer = await Retailer.findOneAndUpdate({userId: req.user.id}, {$set: {bank: id}}, {new: true})
            }else if(req.body.role == "implement"){
                const implement = await Implement.findOneAndUpdate({userId: req.user.id}, {$set: {bank: id}}, {new: true})
            }else if(userRole.role == "labourprovider"){
                const labourprovider = await LabourProvider.findOneAndUpdate({userId: req.user.id}, {$set: {bank: id}}, {new: true})
            }
        }
        
        // Return the Aadhaar
        res.status(200).json({"response": "200","message": "In review"});
    } catch (err) {
      console.log(err);
      return res.status(500).json({"response": "500", "message": "Internal Server Error" });
    }
  });

  router.post("/certificate", verifyToken, async (req, res) => {
    try {

        const user = await User.findById(req.user.id)

        // Get the user roles
        const userRoles = await user.userrole;

        // Check if any of the user roles is "labourprovider"
        const isLabourProvider = userRoles.some(userRole => userRole.role === "labourprovider");

        if(isLabourProvider){
            // Create a new Aadhaar
            const certificate = new Certificate({
                certificateNo: req.body.certificateNo,
                certificate: req.body.certificate,
                userId: req.user.id,
                status: "pending",
            });

            // Save the Aadhaar
            await certificate.save();
            
            // Get the ID of the Aadhaar
            const id = certificate._id;

            const labourprovider = await LabourProvider.findOneAndUpdate({userId: req.user.id}, {$set: {certificate: id}}, {new: true})

            // Return the Aadhaar
            res.status(200).json({"response": "200","message": "In review"});
        }else{
            res.status(401).json({"response": "401", "message": "You don't have labourprovider userrole"})
        }
        
    } catch (err) {
      console.log(err);
      return res.status(500).json({"response": "500", "message": "Internal Server Error" });
    }
  });



  

  

  module.exports = router