const { verifyTokenAndAuth, verifyToken } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const router = require("express").Router()



//add address
router.put("/addAddress", verifyToken, async (req, res)=>{
    try{
        const address = {
            id: (req.user.addresses.length + 1).toString(),
            name: req.body.name,
            mobile: req.body.mobile,
            addressLine: req.body.addressLine,
            state: req.body.state,
            district: req.body.district,
            block: req.body.block,
            village: req.body.village,
            pincode: req.body.pincode
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.user.id, {$push: {addresses: address}}, {new:true})
            return res.status(200).json({"response": "200","message": "Address Updated Sucessfully"})
        }catch(err){
            console.log(err)
            return res.status(500).json({"response": "500","message": "Internal Server Error"})
        }
    }catch(err){
        res.status(500).json({"error": err})
    }
})


//Update user address
router.put("/updateAddress/:id", verifyToken, async (req, res) => {
    try {
      const addressId = req.params.id;
      const {
        name,
        mobile,
        addressLine,
        state,
        district,
        block,
        village,
        pincode
      } = req.body;
  
      const updatedAddress = {
        id: addressId,
        name,
        mobile,
        addressLine,
        state,
        district,
        block,
        village,
        pincode
      };
  
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.user.id, "addresses.id": addressId },
          { $set: { "addresses.$": updatedAddress } },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({ "response": "404","message": "Address not found" });
        }
  
        return res.status(200).json({ "response": "200","message": "Address updated successfully" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ "response": "500","message": "Internal Server Error" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
});



//Delete address 
router.delete("/deleteAddress/:id", verifyToken, async (req, res) => {
try {
    const addressId = req.params.id;

    try {
    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { addresses: { id: addressId } } },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({"response": "404", "message": "User not found" });
    }

    return res.status(200).json({ "response": "200","message": "Address deleted successfully" });
    } catch (err) {
    console.log(err);
    return res.status(500).json({ "response": "500","message": "Internal Server Error" });
    }
} catch (err) {
    res.status(500).json({ error: err });
}
});
  

//Get all address of user
router.get("/getAddresses", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ "response": "404","message": "User not found" });
      }
  
      const addresses = user.addresses;
      return res.status(200).json({"response": "200"}, addresses );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ "response": "500","message": "Internal Server Error" });
    }
});


router.get("/getAddress/:id", verifyToken, async (req, res) => {
    try {
      const addressId = req.params.id;
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ "response": "404","message": "User not found" });
      }
  
      const address = user.addresses.find((addr) => addr.id === addressId);
      if (!address) {
        return res.status(404).json({ "response": "404","message": "Address not found" });
      }
  
      return res.status(200).json({ "response": "200" }, address );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ "response": "500","message": "Internal Server Error" });
    }
  });
  
module.exports = router