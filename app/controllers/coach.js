const coachDataMapper = require('../dataMappers/coach');

module.exports = {

    // Comme on va utiliser des méthodes du dataMapper dans le controller et que les méthode du dataMappers sont asynchrone, il faut aussi que le controller le soit.
    // par contre il ne faut pas oublier qu'un controller dans express c'est un middleware, donc il faut préciser les paramètres
    async list(_, response) {

        console.log('route OK')
   
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
    },

    async signin(request, response) {

        console.log('console.log(request.body)',request.body)

        try {
            const user = await coachDataMapper.signin(request.body)

            console.log( 'user', user)
            
            //vérification que l'email existe en bdd
            if(!user){
                //si l'email n'existe pas envoi d'un message d'échec de la connection

                console.log('erreur user inexistant')
                return response.status(404).json({
                    message: 'Identifiants incorrects'
                });
            };

            //si le password n'est pas correct envoi d'un message d'échec de la connection
            if(request.body.password != user.password){
                return response.status(404).json({
                    message: 'Identifiants incorrects'
                });
            };

            

            //Si email et password OK envoi des informations du user, un message de Connexion autorisée
            // et un token
            response.json({
                user, 
                message: "Connexion autorisée"
            });
            
        } catch (error) {

            console.trace(error);
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
            
        }
    },

};