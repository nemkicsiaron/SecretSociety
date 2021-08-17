const express = require('express');
const https = require('https');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config()

const app = express();

const helloMiddleware = (req, res, next) => {
    console.log("hello");
    next();
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello");
});


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000);