const express = require("express")
const cors = require("cors")

const DBZRouter = require("./dbz/dbz-router");

const server = express()



server.use(cors())
server.use(express.json())

server.get("/", (req, res) => {
    res.json({
        message: "Welcome To My API",
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something Went Wrong",
    })
})

server.use("/api/dbz", DBZRouter);

module.exports = server