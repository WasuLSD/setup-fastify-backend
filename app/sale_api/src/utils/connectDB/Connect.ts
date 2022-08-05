import sql from 'mysql2';

/* sql configuration */

export const pool = sql.createConnection({
    user: 'admin',
    password: 'password',
    database: 'my_db',
    host: 'localhost',
});

// const config = {
//     user: 'user',
//     password: 'password',
//     database: '***',
//     port: '3306',
//     multipleStatements: true,
//     timezone: '+00:00',
// };

// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export async function getRequest() {
//     return new Promise(function (resolve, reject) {
//         sql.close();
//         sql.connect(config, function (err: unknown) {
//             if (err) reject(err);
//             const sqlRequest = new sql.Request();

//             //console.log(sqlrequest);
//             resolve(sqlRequest);
//         });
//     });
// }
