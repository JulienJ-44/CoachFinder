const {
  Pool
} = require('pg');


const poolConfig = {

  connectionTimeoutMillis: 1000,

  idleTimeoutMillis: 1000,

  max: 5
};

// Chaque installation de node a une variable d'environnement qui, par défaut, contien la string "development". 
// Si on est en production
if (process.env.NODE_ENV === 'production') {
  // Alors j'ajoute une propriété concernant le ssl, 
  // qui est nécessaire sur heroku, mais qui empeche le fonctionnement en developpement
  poolConfig['ssl'] = {
    rejectUnauthorized: false
  };
}

const client = new Pool(poolConfig);

module.exports = client;