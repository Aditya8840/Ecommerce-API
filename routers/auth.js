const User = require("../models/User")
const router = require("express").Router()
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const axios = require("axios")


/**
 * Express Router for handling user-related routes.
 *
 * @type {Object}
 * @namespace /api/user
 */

/**
 * Send OTP to the specified phone number.
 * @param {string} req.body.phone - The phone number to send the OTP.
 * @returns {Object} The access token in the response body.
 */


router.post("/sendotp", async (req, res) => {
    const phone = req.body.phone
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP
    await sendotp(phone.toString(), otp.toString())
    const accessToken = jwt.sign({phone: phone.toString(), otp: otp},process.env.JWT_SECRET, {expiresIn: '600'})
    res.status(200).json({"token": accessToken});
})


/**
 * Verify the received OTP.
 * @param {string} req.body.token - The token received from sending OTP.
 * @param {string} req.body.otp - The OTP to verify.
 * @returns {Object} The response containing the access token or error information.
 */

router.post("/verifyotp", async (req, res) => {
    const token = req.body.token
    const otp = req.body.otp

    const decodedToken = jwt.decode(token);
    console.log(decodedToken.otp+" "+decodedToken.phone)
    if(otp == decodedToken.otp){
        const user = await User.findOne({mobile: decodedToken.phone})
        if(user){
            const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET, {expiresIn: '3d'})
            console.log(user._doc)
            res.status(200).json({"response": "200","token": accessToken});
        }else{
            const newUser = new User({
                name: "null",
                mobile: decodedToken.phone
            })
            console.log(newUser)
            try{
                const savedUser = await newUser.save()
                console.log(savedUser)
                const others = savedUser._doc
                const accessToken = jwt.sign({id: savedUser._id, isAdmin: savedUser.isAdmin},process.env.JWT_SECRET, {expiresIn: '3d'})
                res.status(201).json({ "response": "201","token": accessToken});
            }catch(err){
                console.log(err)
                res.status(500).json({"response": "500","error": err});
            }
        }
    }

})



/**
 * Send OTP to the specified number using the SMS API.
 *
 * @async
 * @function
 * @name sendotp
 * @param {string} number - The phone number to send the OTP.
 * @param {string} otp - The OTP to be sent.
 * @returns {Promise} The response from the SMS API.
 */

async function sendotp(number, otp) {
    let message = `${otp}- is your OTP. Please do not share this OTP with anyone.
  By submitting this OTP you agree to the T&C of AgriDhaan Global Private Limited.- Team AgriDhaan`;
  
    let params = [
      ["username", "AGRIDHAAN"],
      ["apikey", process.env.SMS_API_KEY],
      ["apirequest", "Text"],
      ["message", message],
      ["route", "TRANS"],
      ["TemplateID", "1207162148979043704"],
      ["mobile", number.toString()],
      ["sender", "AgDhan"],
      ["format", "JSON"]
    ];
  
    try {
      const response = await axios.get("http://123.108.46.13/sms-panel/api/http/index.php", {
        params: Object.fromEntries(params)
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

module.exports = router