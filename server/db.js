const mysql = require('mysql')
const config = {
    database: 'flight_sys',
    user: '你的数据库用户名',
    password:'数据库用户密码'
}


const pool = mysql.createPool(config)
exports.db = (sql, sqlParams) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (!err) {
                conn.query(sql, sqlParams, (e, results) => {
                    if (!e) {
                     //   console.log(results)
                        resolve(results)
                        conn.destroy()
                    } else {
                        console.log('sql',e.toString().slice(0,100))
                        reject(e)
                    }
                })
            } else {
                console.log('conn err', err)
                reject(err)
            }
                 
        })
    })
}
