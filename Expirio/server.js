const jwt  = require('jsonwebtoken');

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//---------------------------------------------------------------------------------------
// Middlewares
//---------------------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

//---------------------------------------------------------------------------------------
// Connect to to Mongodb server
//---------------------------------------------------------------------------------------
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb installed succesfully')
});

//---------------------------------------------------------------------------------------
// Import routers
//---------------------------------------------------------------------------------------

const itemsRouter = require('./routes/items');
const userRouter = require('./routes/user')

//---------------------------------------------------------------------------------------
// Use routers
//---------------------------------------------------------------------------------------

app.use('/items', itemsRouter);
app.use('/user', userRouter);


//---------------------------------------------------------------------------------------
// Create Server Using port
//---------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

//---------------------------------------------------------------------------------------
// Text messaging and email APIs
//---------------------------------------------------------------------------------------

