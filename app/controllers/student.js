const studentDataMapper = require('../dataMappers/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async signin(request, response) {

        try {

            const user = await studentDataMapper.signin(request.body)

            //vérification que l'email existe en bdd
            if (!user) {
                //si l'email n'existe pas envoi d'un message d'échec de la connection
                return response.status(404).json({
                    message: 'Identifiants incorrects'
                });
            };

            //comparaison du MdP envoyé par le user avec celui enregistré en BDD
            passwordTest = await bcrypt.compare(request.body.password, user.password);

            //si le password n'est pas correct envoi d'un message d'échec de la connection
            if (!passwordTest) {
                return response.status(404).json({
                    message: 'Identifiants incorrects'
                });
            };

            //Création du token 
            const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                },
                //clé secrète utilisée par JWT
                process.env.JWT_KEY, {
                    //durée d'activité du token
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

            //Si email et password OK envoi des informations du user, un message de Connexion autorisée
            // et un token
            response.json({
                user,
                message: "Connexion autorisée",
                token
            });

        } catch (error) {

            console.trace(error);
            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`
            });

        }
    },

    async add(request, response) {

        try {

            // opération de hashage du password dans le request.body
            request.body.password = await bcrypt.hash(request.body.password, 10)

            const student = await studentDataMapper.add(request.body);

            response.status(200).json({
                student,
                message: "Inscription réussie"
            });



        } catch (error) {

            console.trace(error);

            //Nous avons utilisé la contrainte unique en BDD. 
            //On peut donc faire en sorte de récupérer les code erreur 23505 qui est et sera toujours 
            //le code d'erreur de "duplicate entry". 
            if (error.code === '23505') {
                return response.status(400).json({
                    data: [],
                    error: `Cet email existe déjà dans la base de données, veuillez utiliser un email différent`
                });
            }

            response.status(500).json({
                data: [],
                error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`
            });
        }
    },

    async update(request, response, next) {
        try {

            const student = await studentDataMapper.update(request);

            if (!student) {
                next();
                return
            }

            response.json({
                student
            });

        } catch (error) {
            console.trace(error);

            if (error.code === '23505') {
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