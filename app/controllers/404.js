
module.exports = {
    // ajouter un reponse render avec une image ?
    notFoundResource(_, response){
        response.status(404).json({data: [], error: `Resource not found`});
    }
}
