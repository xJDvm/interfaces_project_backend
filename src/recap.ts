const myName = 'Alice';
const myAge = 30;

const suma = (a: number, b: number) => {
  return a + b;
};

suma(1, myAge);

class Persona {
  // private age;
  // private name;

  constructor(private age: number, private name: string) {}

  getSummary() {
    return `My name is ${this.name} and I am ${this.age}`;
  }
}

const nicolas = new Persona(30, 'Nicolas');
