//Imports
let express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
require('dotenv').config();
const bodyParser = require('body-parser')

//starting an Express app.
let app = express();

//Middlewares used: static, logger & bodyParser.
app.use("/public", express.static(__dirname + "/public"))
app.use((req, res, next) => {
    console.log(`
        ${req.method} ${req.path} - ${req.ip}
        `)
    next()
})
app.use(bodyParser.urlencoded({extended: false}))

//serve HTML file.
app.get("/", (req, res) => {
    const path = __dirname + "/views/index.html"
    res.sendFile(path)
})

//serve JSON files.
app.get("/json", (req, res) => {
    const data = {"message": "Hello json"}
    const response = {"message": "Hello json".toUpperCase()}

    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json(response)
    } else {
        res.json(data)
    }
})

//Chaining custom time midlleware.
app.get("/now", 
    (req, res, next) => {
    req.time = new Date().toString();
    next()
}, 
    (req, res) => {
    res.json({time: req.time})
})

//Get route params.
app.get("/:word/echo",
    (req, res) => {
        res.send({echo: req.params.word})
    }
)

//Get query params.
app.get("/name?",
    (req, res) => {
        res.send({ name: `${req.query.first} ${req.query.last}` })
    }
) 

//utilizing the body-parser mddleware with a POST request.
app.post("/name",
    (req, res) => {
        res.send({name: `${req.body.first} ${req.body.last}`})
        console.log(`Sent By: ${req.body.last}`)
    }
)



































 module.exports = app;
