class LoggerIterator<T> {
  private index: number = 0;
  constructor(private items: T[]) {}

  next(): T {
    const item = this.items[this.index++];
    console.log("Item:", item);
    return item;
  }

  hasNext(): boolean {
    return this.index < this.items.length;
  }

  reset() {
    this.index = 0;
  }

  first() {
    this.reset();
  }
}

(() => {
  const items = [1, 2, 3, 4, 5, 6, 7];
  const logIterator = new LoggerIterator(items);

  while (logIterator.hasNext()) {
    const value = logIterator.next();
    // ...
  }
})();
