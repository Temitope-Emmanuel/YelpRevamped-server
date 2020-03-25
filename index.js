require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

const PORT  = process.env.PORT || 8082

const errHandler = require("./handlers/error")
const authRoutes = require("./routes/auth.js")

app.use(cors())
app.use(bodyParser.json())
app.use("/api/auth/",authRoutes)




app.use(function(req,res,next){
    let err = new Error("Not Found!!! :(")
    err.status = 400
    next(err)
})


app.use(errHandler)

app.listen(PORT,() =>(
    console.log(`we are listening at port ${PORT}`)
))