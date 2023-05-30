const mongoose = require('mongoose')

const url = process.env.MONGODB_URL


//MongoDB Connection
mongoose.connect(url)
    .then(()=> console.log("Connected"))
    .catch(err => console.log(err))