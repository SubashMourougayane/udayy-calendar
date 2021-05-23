const express = require('express');
const cluster = require('cluster');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const jwt = require('jsonwebtoken');
var logger = require('morgan');
var createError = require('http-errors');
const bodyparser = require('body-parser')

const DB = require('./src/models');
const GATEKEEPER = require('./src/gatekeeper/gatekeeper')
const sequelize = require('./src/models');
const routerIndex = require('./src/routes')

const routeInit = (app) => {

    // add all your middlewares here
    app.use(bodyparser.urlencoded({ extended: false }))
    app.use(bodyparser.json())
    app.use(function (request, response, next) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, On-behalf-of, x-sg-elas-acl");
        response.header("Access-Control-Allow-Credentials", true);
        response.header("access-control-allow-methods", "*");
        next();
    });
    app.use(logger('dev'));

    app.get("/health", (req, res) => {
        GATEKEEPER.successDataResponse(res, {
            Server: process.env.APP_NAME,
            Port: process.env.APP_PORT,
            Environment: process.env.APP_ENV,
            Version: require("./package.json").version
        });
    });
    app.use(cors());

    app.use(cookieParser());


    app.use('/api/v1', routerIndex)

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });


}


const init = () => {
    if (cluster.isMaster) {
        const numCPUs = require('os').cpus().length;
        console.log(`Master ${process.pid} is running`);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });

    } else {
        var app = express();

        routeInit(app);


        DB.sequelize
            .authenticate()
            .then(() => {
                app.listen(process.env.APP_PORT, () => console.log(" 💻 Server listening on port " + process.env.APP_PORT + " in " + process.env.APP_ENV + " mode version is " + require("./package.json").version));
            })
            .catch(error => {
                console.log('Error connecting to DB', error);
            });



        app.disable('x-powered-by');
    }
};

init();