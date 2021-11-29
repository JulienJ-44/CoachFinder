const client = require('../client');

module.exports = {


    async getByRequestId(requestId) {

        const result = await client.query(`SELECT * FROM answer WHERE request_id = $1`,
        [requestId])

        return result.rows
    },

    async add(data){
        const result = await client.query(`INSERT INTO answer 
        (message, sender, request_id) 
        VALUES ($1, $2, $3) RETURNING *`,
        [data.message, data.sender, data.request_id]);

        console.log(result.rows[0])
       
        return result.rows[0]
    },

    
}
