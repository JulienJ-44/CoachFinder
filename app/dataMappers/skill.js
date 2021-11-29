const client = require('../client');

module.exports = {

    async getAll() {

        const result = await client.query(`SELECT * FROM skill`);
        return result.rows;
    },

    async addToCoachId(coach_id, skill_id){

        const result = await client.query(`INSERT INTO coach_has_skill  
        (coach_id, skill_id) 
        VALUES ($1, $2) RETURNING *`,
        [coach_id, skill_id])
        return result.rows;
    }

    
}