const express = require('express')
const { config } = require('./config/index')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan');
const routes = require('./routes/routes')
const cors = require('cors')
const http = require("http").Server(app);
const so = require('os');
const { mongoose } = require("./lib/mongo");

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routes
routes(app)


http.listen(config.port, () => {
    host = so.networkInterfaces();

    Object.keys(host).forEach(function (ifname) {
        var alias = 0;
      
        host[ifname].forEach(function (iface) {
          if ('IPv4' !== iface.family || iface.internal !== false) {
            return;
          }
      
          if (alias >= 1) {
            console.log(`App listening on ${iface.address} with port ${config.port}!`)
          } else {
            console.log(`App listening on ${iface.address} with port ${config.port}!`)
          }
          ++alias;
        });
      });
    
})