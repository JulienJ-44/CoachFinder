const client = require('../client');

module.exports = {

    async getByCoachId(coachId) {

        const result = await client.query(`SELECT * FROM request
        WHERE coach_id = $1`, [coachId]);
        return result.rows;
    },

    
}