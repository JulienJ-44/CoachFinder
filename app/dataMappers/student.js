const client = require('../client');

module.exports = {


    async signin(data) {

        const result = await client.query(`SELECT * FROM student WHERE email= $1`,
        [data.email])

        return result.rows[0]
    },

    
}