const router = require("express").Router()
const Joi = require("joi")

const { exception } = require("../middleware/exceptionHandler")

let { orders } = require("../data/orders")
let { owner } = require("../data/users")


router.get("/:id/parcels",exception((req,res) => {
    const user = owner.filter(user => user._id === +req.params.id)
    if (user.length === 0){
        return res.status(400).json({
            message: `No user with id: ${req.params.id}`
        })
    }
    const userOrders = orders.filter(order => order.parcelOwnerId === +req.params.id)
    if (userOrders.length === 0){
        return res.status(404).json({
            message: `user: ${user[0].fname} ${user[0].lname} with id: ${user[0]._id} has no parcel delivery orders yet`
        })
    }
    res.status(200).json({
        "parcel delivery orders": userOrders
    })
}))

module.exports = router