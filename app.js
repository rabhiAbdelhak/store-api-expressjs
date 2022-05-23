const express = require('express');
require('express-async-errors');
const {connectDB} = require('./db/connect');
const productRouter = require('./routes/products');
const notFound = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
require('dotenv').config();




const port = process.env.PORT || 5000
app = express();

//middlewares
app.use(express.json());
app.use('/api/v1/products', productRouter);

app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">go to products</a>')
});

app.use(notFound)
app.use(errorMiddleware);





const start = async () => {
  try{
    await connectDB(process.env.DATABASE_URI);
    app.listen(port , () => {
        console.log('server is listening on port : ' + port)
    }) 
  }catch(err){
      console.log(err)
  }
}

start();
