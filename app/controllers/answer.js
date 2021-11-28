const requestDataMapper = require('../dataMappers/answer');

module.exports = {

    async listByCoach(request, response) {
   
        try {
            // Récupération des données
            const answers = await requestDataMapper.getByRequestId(request.params.id);

            response.json({data: answers});
        }catch(error){
           
            console.trace(error);
            // Pour l'utilisateur on affiche une erreur générique lui spécifiant qu'une erreur serveur s'est produite.
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    }

};