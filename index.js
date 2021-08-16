const express = require('express');

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
    const { username, password } = req.body;
    res.send("Response");
})


app.listen(3000);