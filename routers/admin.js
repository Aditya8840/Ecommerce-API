const { verifyTokenAndAuth, verifyToken } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const router = require("express").Router()


router.get("/getAllUsers", verifyToken, async (req, res) => {
    try {
      const currentUser = await User.findById(req.user.id);
  
      if (!currentUser) {
        return res.status(404).json({ "response": "404","message": "User not found" });
      }
  
      if (!currentUser.isAdmin) {
        return res.status(403).json({ "response": "403","message": "Unauthorized access" });
      }
  
      const users = await User.find();
      return res.status(200).json({ "response": "200" }, users );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ "response": "500","message": "Internal Server Error" });
    }
  });
  

  module.exports = router