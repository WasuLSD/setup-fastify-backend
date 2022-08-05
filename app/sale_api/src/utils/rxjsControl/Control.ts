import got from 'got';

import { pool } from '../connectDB/Connect';
import { delay } from '../rxjsDelay/Delay';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function control(chanel: string, callback) {
    switch (chanel) {
        case 'dbconnect':
            pool.connect((err) => {
                if (err) {
                    console.log(err);
                } else {
                    delay('Database Connected', null, callback);
                }
            });
            break;

        case 'sendEmail':
            delay('Send Email Completed', null, callback);
            break;

        case 'sendSMS':
            delay('Send SMS Completed', null, callback);
            break;

        case 'responseAX':
            interface IHere {
                msg: string;
            }
            // eslint-disable-next-line no-case-declarations
            const result: IHere = await got.get('http://127.0.0.1:3000/axApi').json();

            console.log(result);
            delay(JSON.stringify(result), null, callback);
            break;

        case 'savetoDB':
            pool.query(
                `INSERT INTO DATADUMP VALUES ('email@email.com', '0999999999');`,
                function (err, results, fields) {
                    console.log(results);
                    console.log(fields);
                    pool.end();
                },
            );
            delay('Save to Database completed', null, callback);
            break;

        default:
            // eslint-disable-next-line no-case-declarations
            const error = chanel.startsWith('error') ? new Error('Error kab') : null;

            delay(chanel, error, callback);
            break;
        // delay(null, new Error(), callback);
    }
}

// export function newControl(chanel: string, callback): void {}
