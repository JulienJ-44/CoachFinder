const client = require('../client');

module.exports = {

    async getAll() {

        const result = await client.query(`SELECT * FROM skill`);
        return result.rows;
    },

    
}