require('dotenv').config();

const express = require('express');

const helmet = require('helmet');

const cors = require('cors');

const app = express();

//!Paramètres cors policy OK pour dev, à mettre à jour lors du déploiement final
app.use(cors('*'));

const port = process.env.PORT || 4000;

app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.use(express.urlencoded({extended: true}));

const router = require('./app/routers');
const errorController = require('./app/controllers/404');

// middleware permettant de contrer les attaques cross site scripting (XSS) ou injection HTML. 
app.use(helmet());

app.get('/', function (req, res) {
    res.send('Hello World!');
  });

app.use('/api/v1', router);

app.use(errorController.notFoundResource);

app.listen(port, _=> {
    console.log(`http://localhost:${port}`);
});