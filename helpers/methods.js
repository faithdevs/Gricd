const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bookModel = require("../models/book");


authenticateToken= function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401) //HTTP 401 Unauthorized client error status

    jwt.verify(token, process.env.ACCESS_TOKEN_SECERET, (err, user) => {
        console.log("JWT - Verify")
        if (err) {
            console.log('HTTP 403 Forbidden client')
            return res.sendStatus(403) //HTTP 403 Forbidden client error status
        }
        req.user = user
        console.log('Authenticated Successfully')
            // res.send("OK")
        next()
    })
}

module.exports = authenticateToken;



