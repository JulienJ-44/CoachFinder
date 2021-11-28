const client = require('../client');

module.exports = {

    async getAll() {

        const result = await client.query(`SELECT first_name, last_name, zip_code, rate, 
        string_agg(skill.designation, ',') AS skill  
        FROM coach
        JOIN coach_has_skill ON coach_has_skill.coach_id = coach.id
        JOIN skill ON skill.id = coach_has_skill.skill_id
        GROUP BY coach.id`);
        return result.rows;
    },

    
}

