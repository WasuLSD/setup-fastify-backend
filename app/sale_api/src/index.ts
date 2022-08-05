import * as AWS from '@aws-sdk/client-sns';
import { PublishCommand } from '@aws-sdk/client-sns';
import fastify from 'fastify';
import { bindNodeCallback, of, zip } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { control } from './utils/rxjsControl/Control';

const client = new AWS.SNS({ region: 'REGION' });
const command = new PublishCommand({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Message: 'email@email.com',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    PhoneNumber: '0999999999',
});
const app = fastify({
    logger: true,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function callObservable(
    item1: string,
    item2: string,
    item3: string,
    item4: string,
    item5: string,
) {
    return of([item1, item2, item3, item4, item5]).pipe(
        concatMap((chanel) => {
            return zip([
                bindNodeCallback(control)(chanel[0]),
                bindNodeCallback(control)(chanel[1]),
                bindNodeCallback(control)(chanel[2]),
                bindNodeCallback(control)(chanel[3]),
                bindNodeCallback(control)(chanel[4]),
            ]);
        }),
    );
}

app.get('/sendEmail', async (request, reply) => {
    try {
        const data = await client.send(command);

        console.log(data);
    } catch (error) {
        console.log(error);
    }

    callObservable('dbconnect', 'sendEmail', 'sendSMS', 'responseAX', 'savetoDB').subscribe({
        next: (x) => {
            console.log(x);
        },
        error: (e) => console.log(e),
        complete: () => {
            reply.send('ok').status(200);
        },
    });
});

export { app };
