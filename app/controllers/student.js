const studentDataMapper = require('../dataMappers/student');

module.exports = {
    async signin(request, response) {

        console.log('console.log(request.body)',request.body)

        try {
            const user = await studentDataMapper.signin(request.body)

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