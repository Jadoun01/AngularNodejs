const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const projectsRoutes = require('./api/routes/projects');
const testerRoutes = require('./api/routes/tester');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb+srv://project-manager:' + process.env.DB_PASSW + '@project-manager-4xg5n.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Autherization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
    //9251088066
});


app.use('/projects', projectsRoutes);
app.use('/tester', testerRoutes);
app.use('/user', userRoutes);


//Error Handling
app.use((req, res, next)=>{
     const error = new Error('Not Found');
     error.status = 404;
     next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;