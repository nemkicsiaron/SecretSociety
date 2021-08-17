const express = require('express');
const https = require('https');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config()
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

let refreshTokenList = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(refreshTokenList.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = genAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })
})

app.delete('/logout', (req, res) => {
    refreshTokenList = refreshTokenList.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/login', genAccessToken, (req, res) => {
    // Authentication TODO
    const { username, password } = req.body;
    const user = {name: username}

    const accessToken = genAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokenList.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
    res.send("Response");
})

function genAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}

app.listen(4000);