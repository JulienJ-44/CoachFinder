const answerDataMapper = require('../dataMappers/answer');

module.exports = {

    async listByRequest(request, response) {
   
        try {
            // Récupération des données
            const answers = await answerDataMapper.getByRequestId(request.params.id);

            response.json({data: answers});
        }catch(error){
           
            console.trace(error);
            // Pour l'utilisateur on affiche une erreur générique lui spécifiant qu'une erreur serveur s'est produite.
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    },

    async add(request, response) {
   
        try {
            // Récupération des données
            const result = await answerDataMapper.add(request.body);

            response.json({data: result});
        }catch(error){
           
            console.trace(error);
            // Pour l'utilisateur on affiche une erreur générique lui spécifiant qu'une erreur serveur s'est produite.
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    }

};