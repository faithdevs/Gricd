const mongoose = require('mongoose');

const MONGODB_URL ="mongodb://127.0.0.1:27017/GricdBooks"
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err) => {
    if (err) console.error(err)
    else console.log("Connected To MongoDB")
})



