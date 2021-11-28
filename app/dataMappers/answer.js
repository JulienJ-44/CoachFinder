const client = require('../client');

module.exports = {


    async getByRequestId(requestId) {

        const result = await client.query(`SELECT * FROM answer WHERE request_id = $1`,
        [requestId])

        return result.rows
    },

    
}