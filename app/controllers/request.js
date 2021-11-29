const requestDataMapper = require('../dataMappers/request');

module.exports = {

    async listByCoach(request, response) {
   
        try {
            // Récupération des données
            const requests = await requestDataMapper.getByCoachId(request.params.id);

            response.json({data: requests});
        }catch(error){
           
            console.trace(error);
            // Pour l'utilisateur on affiche une erreur générique lui spécifiant qu'une erreur serveur s'est produite.
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    },

    async add(request, response) {


        try {
            // Récupération des données
            const result = await requestDataMapper.add(request.params.coach_id, request.params.student_id, request.body);

            response.json({data: result});
        }catch(error){
           
            console.trace(error);
            // Pour l'utilisateur on affiche une erreur générique lui spécifiant qu'une erreur serveur s'est produite.
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    }

};