const express = require('express');
const https = require('https');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config()
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

let users = []

app.get('/', (req, res) => {
    res.send("Hello");
});

app.get('/members', (req, res) => {
    res.json.users
})

app.post('/members', async (req, res) => {
    try{
        const hashedPW = await bcrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, password: hashedPW}
        users.push(user)
        res.sendStatus(201)
    }
    catch {
        res.sendStatus(500)
    }
})

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