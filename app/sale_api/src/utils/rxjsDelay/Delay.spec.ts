import { delay, randDelay } from './Delay';

afterAll(() => {
    jest.resetModules();
});

jest.setTimeout(20000);

test('that is test delay function can delay process and have callback respond', () => {
    const mockCallback = jest.fn();

    {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        () => {
            delay('this called', null, mockCallback);
            expect(mockCallback).toHaveBeenCalled();
        };
    }
});

test('The delay time is between 1 - 10 second', () => {
    const checkDelay: number = randDelay();

    expect(checkDelay).toBeGreaterThan(0);
    expect(checkDelay).toBeLessThan(10000);
});
