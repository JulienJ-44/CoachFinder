const client = require('../client');

module.exports = {


    async signin(data) {

        const result = await client.query(`SELECT * FROM student WHERE email= $1`,
        [data.email])

        return result.rows[0]
    },

    async add(data) {

        const result = await client.query(`INSERT INTO student 
        (email, last_name, first_name, zip_code, password) 
        VALUES ($1, $2, $3, $4, $5 ) RETURNING *`,
        [data.email, data.last_name, data.first_name, data.zip_code,  data.password]);

        console.log(result.rows[0])
       
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

        console.log('fields: ', fields)


        let textSql = `UPDATE student SET ${fields}, updated_at = now() WHERE id=$1 RETURNING *`;

        console.log('textSql: ', textSql)

        let sql = {
            text: textSql,
            values: sqlValues
        };

        console.log('sql: ', sql)

        const result = await client.query(sql);
        return result.rows;
}
    
}