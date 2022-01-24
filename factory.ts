class Dog {
  constructor(private name: string, private age: number) {}

  say(): void {
    console.log(`Dog: ${this.name} is ${this.age} yo.`);
  }
}

class DogFactory {
  create(name: string) {
    return new Dog(name, 1);
  }
}

(() => {
  const animals = [];
  const dogFactory = new DogFactory();

  animals.push(dogFactory.create("Kobe"));
  animals.push(dogFactory.create("Oscar"));

  animals.forEach((animal) => animal.say());
})();
