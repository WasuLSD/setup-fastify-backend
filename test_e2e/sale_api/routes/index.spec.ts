import { app } from '@app/sale_api'
import { randDelay, delay } from '@app/sale_api/lib/utils/rxjsDelay/Delay'
import { control} from '@app/sale_api/lib/utils/rxjsControl/Control'
import { pool } from '@app/sale_api/lib/utils/connectDB/Connect';

jest.setTimeout(30000);

afterAll(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));
    jest.resetModules();
});

beforeEach(() => {
    jest.resetModules();
});

describe('test happy path GET /sendEmail', () => {
    test('get response = 200', async () => {
        const response = await app.inject({
            method: 'GET',
            path: '/sendEmail',
        });

        const responseBody = response;

        expect(typeof responseBody).toBe('object');
        expect(await response.statusCode).toEqual(200);
        expect(await response.body).toEqual('ok');
    });
});
