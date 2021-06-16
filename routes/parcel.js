const router = require("express").Router()
const Joi = require("joi")

const { exception } = require("../middleware/exceptionHandler")

let { orders } = require("../data/orders")
let { owner } = require("../data/users")

router.get("/",exception((req,res) => {
    let parcels = orders.filter(order => order.status !== "canceled")
    res.status(200).json({
        parcel: parcels
    })
}))
router.get("/all",exception((req,res) => {
    res.status(200).json({
        parcel: orders
    })
}))

router.get("/:id", exception((req,res) => {
    let order = orders.filter(order => order._id === +req.params.id)
    if (order.length >0){
        const parcelOwner = owner.filter(ow => ow._id === order[0].parcelOwnerId)
        const data = {
            ownerName: `${parcelOwner[0].fname} ${parcelOwner[0].lname}`,
            ownerEmail: parcelOwner[0].email,
            parcelType: order[0].parcelType,
            parcelWeight: order[0].parcelWeight.toString()+" Kg",
            from: order[0].from,
            to: order[0].to,
            status: order[0].status
        }
        return res.status(200).json(order)
    }else{
        return res.status(404).json({message: `No parcel with id: ${req.params.id}`})
    }
}))

router.put("/:id/cancel",exception((req,res) => {
    let ordersCopy = [...orders]
    const { params } = req
    let order = ordersCopy.filter(order => order._id === +params.id )
    // let order = ordersCopy.filter(order => order._id === params.id && (order.status === "inprocess" || "pending"))
    if (order.length ===0){
        return res.status(404).json({
            message: `No parcel with id: ${params.id}`
        })
    }
    let index = ordersCopy.findIndex(order => order._id === +params.id)
    order[0].status = "canceled"
    orders.splice(index,1,order[0])
    res.status(201).json({
        data: orders[index]
    })
}))

router.post("/",exception((req,res) => {
    const schema = Joi.object({
        parcelOwnerId: Joi.number().required(),
        parcelType: Joi.string().required(),
        parcelWeight: Joi.number().required(),
        from: Joi.string().required(),
        to: Joi.string().required(),
        destnationName: Joi.string().required(),
        destinationEmail: Joi.string().required(),
        destinationTel: Joi.string().required()
    })
    let { error } = schema.validate(req.body)
    if (error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    let parselOwner = owner.filter(person => person._id === +req.body.parcelOwnerId)
    if (parselOwner.length === 0){
        return res.status(400).json({
            message: `No user with id: ${req.body.parcelOwnerId}`
        })
    }
    let order = {
        _id: orders.length +1,
        ...req.body,
        status: "pending"
    }
    orders.push(order)
    res.status(201).json(orders[orders.length - 1])
}))

module.exports = router