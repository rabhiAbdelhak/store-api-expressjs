const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  res.status(500).json({msg: 'Somthing went wrong', err})
}


module.exports = errorHandlerMiddleware;