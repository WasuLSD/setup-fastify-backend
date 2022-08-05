import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { MockServer } from '@swc/jest';
import got from 'got';
import { lastValueFrom } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { pool } from './utils/connectDB/Connect';

import { callObservable } from '.';

jest.setTimeout(15000);

afterAll(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));
    jest.resetModules();
});

// beforeEach(() => {
//     jest.spyOn(got, 'get').mockRejectedValue({ respone: { msg: 'Response from AX Endpoint' } });
// });

beforeEach(() => {
    snsMock.mockReset();
});

test('try to test unit function', async () => {
    const command = new PublishCommand({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Message: 'email@email.com',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        PhoneNumber: '0999999999',
    });

    const client = new SNSClient({});
    const data = await client.send(command);

    expect(snsMock).toHaveBeenCalledTimes(1);
    expect(snsMock).toHaveBeenCalledWith(command);
});

jest.mock('./utils/connectDB/Connect', () => ({
    pool: {
        connect: jest.fn().mockImplementation((cb) => {
            cb(null);
        }),
        query: jest.fn().mockImplementation((string, cb) => {
            cb(null, null);
        }),
        end: jest.fn(),
    },
}));

// jest.mock('../lib/utils/rxjsDelay/Delay', () => {
//     const originalModule = jest.requireActual('../lib/utils/rxjsDelay/Delay');

//     return {
//         // eslint-disable-next-line @typescript-eslint/naming-convention
//         __esModule: true,
//         ...originalModule,
//         delay: jest.fn().mockImplementation((chanel: string, error: Error | null, cb) => {
//             cb(error, `${chanel}`);
//         }),
//     } as never;
// });

jest.mock('../lib/utils/rxjsControl/Control', () => {
    const originModule = jest.requireActual('../lib/utils/rxjsControl/Control');

    return {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __esModule: true,
        ...originModule,
        control: jest.fn().mockImplementation((chanel: string, cb) => {
            const error = chanel.startsWith('error') ? new Error('Error kab') : null;

            cb(error, `${chanel}`);
        }),
    } as never;
});

const server = new MockServer();

describe('test happy path', () => {
    const route = server.get('/axApi').mockImplementationOnce((response) => {
        response.status(200).send({ msg: 'Response from AX Endpoint' });
    });
    const url = server.getURL;
});

test('test module pipe of observable', async () => {
    const mock = await lastValueFrom(
        callObservable('dbconnect', 'sendEmail', 'sendSMS', 'responseAX', 'savetoDB'),
    );

    //expect(typeof mock).toBe('object');
    expect(got.get).toBeCalledTimes(1);
});

test.skip('test module subscribe of observable and not error', (done) => {
    callObservable('dbconnect', 'sendEmail', 'sendSMS', 'responseAX', 'savetoDB').subscribe({
        next: (response) => {
            expect(typeof response).toBe('object');
            done();
        },
    });
});

test.skip('test module subscribe of observable and error', async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const finalResult = await lastValueFrom(
            // eslint-disable-next-line prettier/prettier
        callObservable('error1', 'error1', 'error1', 'error1', 'error1')
        );

        //jest.runAllTimers();
        expect(finalResult[0]).toContain(Error('Error kab'));
    } catch (e) {
        await expect(e.message).toBe('Error kab');
    }
});

test.skip('test module subscribe of observable and error', (done) => {
    // eslint-disable-next-line prettier/prettier
        callObservable('error1', 'error1', 'error1', 'error1', 'error1').subscribe({
        error: (e) => {
            expect(e.message).toBe('Error kab');
            done();
        },
        // complete: done,
    });
});

test.skip('test 3', async () => {
    try {
        await lastValueFrom(callObservable('error1', 'error1', 'error1', 'error1', 'error1'));
    } catch (e) {
        jest.runAllTimers();
        expect(e.message).toBe('Error kab');
    }
});
