require('dotenv').config();
const http = require("https");
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const consign = require('consign');
const mongoose = require('mongoose');

require('./config/mongodb');

const app = express();
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.urlencoded({ extended: true }));

app.mongoose = mongoose;

consign()
    .include('./config/middlewares.js')
    .then('./models/form.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app);

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Backend funcionando na porta: ${port}`);
})

// Prevent Sleep Heroku every 5mins
setInterval(function () {
    http.get(process.env.API_URL || 'http://localhost:3002/');
    console.log('Waking up!')
}, 300000);