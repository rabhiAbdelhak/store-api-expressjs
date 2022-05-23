const mongoose = require('mongoose');




module.exports.connectDB = (uri) => {
  return mongoose.connect(uri , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}