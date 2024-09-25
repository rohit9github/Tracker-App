const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require("./config/connectDb");
// config dot env file
dotenv.config()

// database connection
connectDb();

// rest object
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes 
app.get('/',(req,res)=>{
    res.send('<h1>hello</h1>')
})

app.use('/api/v1/users',require('./routes/userRoute'))
app.use('/api/v1/transection',require('./routes/transectionRoute'))

//port
const PORT = 8080 || process.env.PORT

//L listen port
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
    
})