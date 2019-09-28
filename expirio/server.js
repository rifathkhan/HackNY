const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const textForAll = require('./services/text').textForAll

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//---------------------------------------------------------------------------------------
// Middlewares
//---------------------------------------------------------------------------------------
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

//---------------------------------------------------------------------------------------
// Connect to to Mongodb server
//---------------------------------------------------------------------------------------
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.set('useFindAndModify', false);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb installed succesfully');
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
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

//---------------------------------------------------------------------------------------
// Background processes
//---------------------------------------------------------------------------------------

server.on('listening', () => {
    setInterval(() => {
        if(mongoose.connection.readyState === 1){
            textForAll();
        }          
    }, 
    1000);
 })
