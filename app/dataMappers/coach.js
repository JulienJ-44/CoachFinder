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

    async signin(data) {

        const result = await client.query(`SELECT * FROM coach WHERE email= $1`,
        [data.email])

        return result.rows[0]
    },

    async add(data) {

        const result = await client.query(`INSERT INTO coach 
        (email, last_name, first_name, description, rate, zip_code, password) 
        VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING *`,
        [data.email, data.last_name, data.first_name, data.description, data.rate, data.zip_code,  data.password]);

        return result.rows[0]
    },

    // update user values
    async update(request) {  
                   
        const id = parseInt(request.params.id, 10);
        const body = request.body;
        const sqlSet = [];
        const sqlValues = [];
        let i = 2;

        sqlValues.push(id);

        for (const property in body) {

            const field = `${property} = $${i}`;
            sqlSet.push(field);
            sqlValues.push(body[property]);
            i++;
        }
        
        const fields = sqlSet.join(', ');

        let textSql = `UPDATE coach SET ${fields}, updated_at = now() WHERE id=$1 RETURNING *`;

        let sql = {
            text: textSql,
            values: sqlValues
        };

        const result = await client.query(sql);
        return result.rows;
    }
}

