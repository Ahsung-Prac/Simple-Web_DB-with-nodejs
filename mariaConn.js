const mariadb = require('mariadb');
 
const pool = mariadb.createPool({
    host: 'localhost', port: 3306,
    user: '', password: '',
    connectionLimit: 5
});
 
async function GetUserList(msg){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE synctest');
        rows = await conn.query(msg);
    }
    catch(err){
		rows = "error";
		rows = err;
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}
 
module.exports = {
    getUserList: GetUserList
}

