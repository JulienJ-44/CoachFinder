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

    async add(request, response) {

        try {
             
            const student  = await studentDataMapper.add(request.body);

            response.status(200).json({
                student, 
                message: "Inscription réussie"
            });
            

            
        }catch(error){

            console.trace(error);

            //Nous avons utilisé la contrainte unique en BDD. 
            //On peut donc faire en sorte de récupérer les code erreur 23505 qui est et sera toujours 
            //le code d'erreur de "duplicate entry". 
            if(error.code === '23505'){
                return response.status(400).json({
                    data: [], 
                    error: `Cet email existe déjà dans la base de données, veuillez utiliser un email différent`
                });
            }

            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    },

    async update(request, response, next) {
        try {
            
            const student = await studentDataMapper.update(request);
            
            if (!student){
                next();
                return 
            }
            
            response.json({student});

        } catch (error) {
            console.trace(error);

            if(error.code === '23505'){
                return response.status(400).json({
                    data: [], 
                    error: `Cet email existe déjà dans la base de données, veuillez utiliser un email différent`
                });
            }
            
            response.json({
                data: [], 
                error: 'Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement'
            });
        }
    }

};