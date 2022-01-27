interface Visitor {
  visitJunior(junior: JuniorEmployee): void;
  visitMiddle(middle: MiddleEmployee): void;
  visitSenior(senior: SeniorEmployee): void;
}

abstract class Employee {
  protected salary: number;

  getSalary(): number {
    return this.salary;
  }

  setSalary(salary: number) {
    this.salary = salary;
  }

  abstract accept(v: Visitor): void;
}

class JuniorEmployee extends Employee {
  protected salary: number = 10;

  accept(v: Visitor): void {
    v.visitJunior(this);
  }
}

class MiddleEmployee extends Employee {
  protected salary: number = 20;

  accept(v: Visitor): void {
    v.visitMiddle(this);
  }
}

class SeniorEmployee extends Employee {
  protected salary: number = 30;

  accept(v: Visitor): void {
    v.visitSenior(this);
  }
}

class AnnualReward implements Visitor {
  visitJunior(junior: JuniorEmployee) {
    junior.setSalary(junior.getSalary() * 1.05);
  }

  visitMiddle(middle: MiddleEmployee) {
    middle.setSalary(middle.getSalary() * 1.1);
  }

  visitSenior(senior: SeniorEmployee) {
    senior.setSalary(senior.getSalary() * 1.15);
  }
}

(() => {
  const employees: Employee[] = [
    new JuniorEmployee(),
    new MiddleEmployee(),
    new SeniorEmployee(),
  ];

  const printSalary = (e: Employee) => {
    console.log(`${(<any>e).constructor.name} salary is ${e.getSalary()}$`);
  };

  employees.forEach(printSalary);

  const annualReward = new AnnualReward();
  employees.forEach((e: Employee) => e.accept(annualReward));
  console.log("\nSalary after annual reward");
  employees.forEach(printSalary);
  
})();
