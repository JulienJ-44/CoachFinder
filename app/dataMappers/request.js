const client = require('../client');

module.exports = {

    async getByCoachId(coachId) {

        const result = await client.query(`SELECT * FROM request
        WHERE coach_id = $1`, [coachId]);
        return result.rows;
    },

    async add(coach_id, student_id, data){
        const result = await client.query(`INSERT INTO request 
        (message, coach_id, student_id) 
        VALUES ($1, $2, $3) RETURNING *`,
        [data.message, coach_id, student_id,]);

        console.log(result.rows[0])
       
        return result.rows[0]
    },

    
}