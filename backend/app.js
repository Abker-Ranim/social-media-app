const express = require('express');
const app = express();
const PORT = 5000;
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");






mongoose.connect('mongodb://127.0.0.1:27017/social_media')
    .then(
        () => {
            console.log('connected');
        }
    )
    .catch(
        (err) => {

            console.log(err);
        }
    )




    mongoose.Promise = global.Promise;







//
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});



//
const personRoutes = require('./api/routes/person.js');
app.use('/person', personRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


















app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running,and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);
module.exports = app;