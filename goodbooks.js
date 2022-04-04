var cors = require('cors')
require('dotenv').config()
require("./boot/dbConnecion");
const { json, urlencoded } = require('express');
const express = require('express');

/* Requires Router Modules */
const adminRouter = require('./routes/admins');
const authorRouter = require('./routes/authors');
const categoryRouter = require('./routes/categories')
const bookRouter = require('./routes/books')

const PORT = process.env.PORT || 3000
const app = express()

// enable cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

/*  Routes */
app.use('/categories', categoryRouter);
app.use('/books', bookRouter);
app.use("/authors", authorRouter);
app.use("/admins", adminRouter);
//////////////

// Application Level Middleware to trap request Info
app.use("/", (req, res) => {
    console.log(`Application Level Middleware : { Time : ${new Date()} , Method : ${req.method} , URL : ${req.url}}`);
    res.send("OK")
})

/* Start The HTTP Server */
app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`Server Started On Port : ${PORT}`)
})