const router = require("express").Router()
const jwt = require("jsonwebtoken")


//Verify Token which is passed in header
const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(err){
                res.status(403).json({"response": "403","message": "Token is not valid"});
            }
            req.user = user
            console.log(user)
            next()
        })
    }else{
        return res.status(401).json({"response": "401","message": "You are not authenticated"})
    }
}


//Check if user with his token or user with token is admin
const verifyTokenAndAuth = (req, res, next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json({"response": "403","message": "You are not allowed!"})
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuth}