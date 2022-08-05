export function randDelay(): number {
    const delayTime: number = Math.floor(Math.random() * 5000);

    return delayTime;
}

export function delay(successResponse, error: Error | null, callback): void {
    setTimeout(() => {
        callback(error, successResponse);
    }, randDelay());
}
