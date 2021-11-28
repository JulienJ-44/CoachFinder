const skillDataMapper = require('../dataMappers/skill');

module.exports = {

    async list(_, response) {
   
        try {
            // Récupération des données
            const skills = await skillDataMapper.getAll();

            response.json({data: skills});
        }catch(error){
           
            console.trace(error);
            // Pour l'utilisateur on affiche une erreur générique lui spécifiant qu'une erreur serveur s'est produite.
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    }

};