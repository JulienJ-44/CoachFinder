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
    },

    async add(request, response) {

     
        const skill_list = request.body.skill_id
        const coach_id = request.params.coach_id
        const list_result = []

        try {
            // Récupération des données
            // const result = await requestDataMapper.add(request.params.coach_id, request.params.student_id, request.body);

            for (const skill of skill_list) {
                skill_id = skill
                const result = await skillDataMapper.addToCoachId(coach_id, skill_id);
                console.log('result: ', result)
                
                list_result.push(result);
            }
            response.json({data: list_result});
            
        }catch(error){
           
            console.trace(error);
            // Pour l'utilisateur on affiche une erreur générique lui spécifiant qu'une erreur serveur s'est produite.
            if(error.code === '23505'){
                return response.status(400).json({
                    data: [], 
                    error: `Compétence déjà sélectionnée`
                });
            }
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    }

};