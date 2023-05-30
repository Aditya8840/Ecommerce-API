const { verifyTokenAndAuth, verifyToken } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const VLC = require("../models/VLC");
const Wholeseller = require("../models/Wholeseller");
const Seller = require("../models/Seller");
const Retailer = require("../models/Retailer");
const LabourProvider = require("../models/LabourProvider");
const Implement = require("../models/Implement");
const router = require("express").Router()



//Change Name
router.put("/name/:id", verifyTokenAndAuth, async (req, res)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json({"response": "200"}, updateUser)
    }catch(err){
        res.status(500).json({"response": "500"},err)
    }
})


// Change profile pic in base64 string
router.post("/profilepic/:id", verifyTokenAndAuth, async (req, res)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json({"response": "200"},updateUser)
    }catch(err){
        res.status(500).json({"response": "500"},err)
    }
})


// delete user
router.delete("/:id", verifyTokenAndAuth, async (req, res)=>{
    try{
        const updateUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({"response": "200","message":"User Deleted Sucessfully"})
    }catch(err){
        res.status(500).json({"response": "500"},err)
    }
})


//user roles
router.post("/userroles", verifyToken, async (req, res)=>{
    try{
        const role = {
            role: req.body.role
        }
        const updateUser = await User.findByIdAndUpdate(req.user.id, {$push: {userrole: role}}, {new:true})
        if(req.body.role == "vlc"){
            const vlc = new VLC({
                userId: req.user.id
            })
            await vlc.save()
        }else if(req.body.role == "seller"){
            const seller = new Seller({
                userId: req.user.id
            })
            await seller.save()
        }else if(req.body.role == "wholeseller"){
            const wholeseller = new WholeSeller({
                userId: req.user.id
                })
                await wholeseller.save()
        }else if(req.body.role == "retailer"){
            const retailer = new Retailer({
                userId: req.user.id
                })
                await retailer.save()
        }else if(req.body.role == "implement"){
            const implement = new Implement({
                userId: req.user.id
                })
                await implement.save()
        }else if(req.body.role == "labourprovider"){
            const labourprovider = new LabourProvider({
                userId: req.user.id
                })
                await labourprovider.save()
        }
        res.status(200).json({"response": "200"},updateUser)
    }catch(err){
        res.status(500).json({"response": "500",},err)
    }
})


// get profile data
router.get("/getUserProfile", verifyToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      console.log(user)
      if (!user) {
        return res.status(404).json({ "response": "404","message": "User not found" });
      }
  
      return res.status(200).json({ "response": "200" },user );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ "response": "500","message": "Internal Server Error" });
    }
  });
  



module.exports = router;