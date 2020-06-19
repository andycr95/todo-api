const mongoose = require('mongoose')
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, { useNewUrlParser: true ,  useCreateIndex: true, useUnifiedTopology: true })
 .then(db => console.log("Connect to DB"))
 .catch(err => console.log(err))

module.exports = mongoose