const express = require('express');
const morgan  = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//bring routes
const authRoutes = require('./routes/auth');

//app
const app = express();

//dB Connect
mongoose
    .set('strictQuery', false)
    .connect(process.env.DATABASE, {})
    .then(() => console.log('Database is connected!'))
    .catch((err) => console.log('DB Error =>', err))

//cors
app.use(cors());

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req,res) => {
    res.json("Server for intelion test")
});

app.use('/api/auth',authRoutes);


//port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
})
