function randDelay(): number {
  const delayTime: number = Math.floor(Math.random() * 10000);

  return delayTime;
}

export { randDelay };
