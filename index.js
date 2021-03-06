require('dotenv').config();

const express = require('express');

const helmet = require('helmet');

const cors = require('cors');

const app = express();

const errorController = require('./app/controllers/404');

//!Paramètres cors policy OK pour dev, à mettre à jour lors du déploiement final
app.use(cors('*'));

const port = process.env.PORT || 4000;

const router = require('./app/routers');

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(helmet());

app.use(router);

app.use(errorController.notFoundResource);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});