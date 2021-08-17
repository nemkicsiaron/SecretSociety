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

app.post('/login', helloMiddleware, (req, res) => {
    // Authentication TODO
    const { username, password } = req.body;
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
    res.send("Response");
})


app.listen(3000);