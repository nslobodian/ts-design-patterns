class Singleton {
  private static _instance: Singleton;

  private constructor() {}

  static getInstance(): Singleton {
    if (!this._instance) {
      this._instance = new Singleton();
    }

    return this._instance;
  }
}

(() => {
  const instance1 = Singleton.getInstance()
  const instance2 = Singleton.getInstance()

  console.log(`Are they the same: ${instance1 === instance2}`)
})()