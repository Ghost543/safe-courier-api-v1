const express = require("express")
const cors = require("cors")

const { error } = require("./middleware/exceptionHandler")

const parcels = require("./routes/parcel")
const users = require("./routes/users")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/parcels",parcels)
app.use("/api/v1/users/",users)

app.use(error)


const port = process.env.PORT || 3100

app.listen(port,err=>{
    if (err) {
        throw err
    }
    console.log(`Server running on http://localhost:${port}`)
})