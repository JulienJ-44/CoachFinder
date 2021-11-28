const coachDataMapper = require('../dataMappers/coach');

module.exports = {

    // Comme on va utiliser des méthodes du dataMapper dans le controller et que les méthode du dataMappers sont asynchrone, il faut aussi que le controller le soit.
    // par contre il ne faut pas oublier qu'un controller dans express c'est un middleware, donc il faut préciser les paramètres
    async list(_, response) {
   
        try {
            // Récupération des données
            const coaches = await coachDataMapper.getAll();

            // Au mileur on a rien à faire come traitement on se conbtente de renvoyer la donnée brute

            // renvoi des données
            // On peut soit, les renvoyées dans une enveloppe soit pas.
            response.json({data: coaches});
        }catch(error){
            // En ce qui concerne les erreurs on peut par défaut afficher ces erreurs en console. DAans le cas d'un application professionnel on stockerais plutôt ces erreurs dans un fichier de log consultable ultérieurement. Mais nous on s'arrête là c'est plus simple.
            console.trace(error);
            // Pour l'utilisateur on affiche pluôt une erreur générique lui spécifiant qu'une erreur serveur s'est produite.
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    }

};