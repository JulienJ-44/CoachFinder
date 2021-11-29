const jwt  = require('jsonwebtoken');

//middleware de vérification de token
module.exports = (req, res, next) => {
    try {

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1];
        //"toto tata" => ["toto", "tata"] => ["tata"]
     
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        req.userData = decoded;
        
        next()

    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }

};