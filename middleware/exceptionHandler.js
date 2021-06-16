exports.error = function (req,res,next) {
    res.status(500).json({
        message: `Something went wrong`
    })
}


exports.exception = function (handler) {
    return (req,res,next) => {
        try {
            handler(req,res)
        }catch (e) {
            next(e)
        }
    }
}