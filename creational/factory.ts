interface AbstractDog {
  say(): void;
}

interface AbstractDogFactory {
  create(name: string): AbstractDog;
}

class Dog implements AbstractDog {
  constructor(private name: string, private age: number) {}

  say(): void {
    console.log(`Dog: ${this.name} is ${this.age} yo.`);
  }
}

class DogFactory implements AbstractDogFactory {
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
