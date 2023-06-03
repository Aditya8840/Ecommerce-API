const { verifyTokenAndAuth, verifyToken } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const router = require("express").Router()



/**
 * Add a new address for the user.
 *
 * @route PUT /addAddress
 * @group User Addresses - Operations related to user addresses
 * @param {Object} req.body - The request body containing the address details.
 * @returns {Object} The HTTP response message in object.
 * @throws {Error} If an error occurs while adding the address.
 */
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


/**
 * Update an existing user address.
 *
 * @route PUT /updateAddress/{id}
 * @group User Addresses - Operations related to user addresses
 * @param {string} req.params.id - The ID of the address to be updated.
 * @param {Object} req.body - The request body containing the updated address details.
 * @returns {Object} The HTTP response message in object.
 * @throws {Error} If the address to be updated is not found.
 */
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



/**
 * Delete an address for the user.
 *
 * @route DELETE /deleteAddress/{id}
 * @group User Addresses - Operations related to user addresses.
 * @param {string} req.params.id - The ID of the address to be deleted.
 * @returns {Object} The HTTP response object of operation sucessful or not.
 * @throws {Error} If the user or address is not found.
 */
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
  

/**
 * Get all addresses of the user.
 *
 * @route GET /getAddresses
 * @group User Addresses - Operations related to user addresses
 * @param {Object} req - The HTTP request object.
 * @returns {Object} The HTTP response objectof all addresses.
 * @throws {Error} If the user is not found.
 */
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


/**
 * Get a specific address of the user.
 *
 * @route GET /getAddress/{id}
 * @group User Addresses - Operations related to user addresses
 * @param {string} req.params.id - The ID of the address to be retrieved.
 * @returns {Object} The HTTP response address object.
 * @throws {Error} If the user or address is not found.
 */
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