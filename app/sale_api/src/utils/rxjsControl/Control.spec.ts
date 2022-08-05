import { pool } from '../connectDB/Connect';
import { delay } from '../rxjsDelay/Delay';

import { control } from './Control';

afterAll(() => {
    jest.resetModules();
});

beforeEach(() => {
    jest.resetModules();
});

jest.mock('../connectDB/Connect', () => ({
    pool: {
        connect: jest.fn().mockImplementation((cb) => {
            cb(null);
        }),
        query: jest.fn().mockImplementation((callback) => {
            callback(new Error('err'), [{ affectedRows: 1 }]);
        }),
        end: jest.fn(),
    },
}));

test('Control test have chanel case in mock', () => {
    const mockCallback = jest.fn();

    {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        () => {
            control('dbconnect', mockCallback);
            expect(delay).toHaveBeenCalled();
        };
    }
});

test('Control test not have chanel case in mock', () => {
    const mockCallback = jest.fn();

    {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        () => {
            control('notHave this', mockCallback);
            expect(delay).toBe(new Error('Error kab'));
        };
    }
});

test('check database has been connect', () => {
    const mockCallback = jest.fn();

    {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        () => {
            control('dbconnect', mockCallback);
            expect(pool).toHaveBeenCalled();
        };
    }
});

test('check query has benn doing', () => {
    const mockCallback = jest.fn();

    {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        () => {
            control('savetoDB', mockCallback);
            expect(pool).toHaveBeenCalled();
        };
    }
});
