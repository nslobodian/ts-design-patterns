class Context {
  public output = 0;
  constructor(public input: string) {}

  startsWith(str: string): boolean {
    return this.input.startsWith(str);
  }
}

class Rule {
  constructor(
    public name: string,
    public one: string,
    public four: string,
    public five: string,
    public nine: string,
    public multiplier: number
  ) {}
}

class Interpreter {
  private rules: Rule[] = [];

  addRule(rule: Rule) {
    this.rules.push(rule);
  }

  execute(context: Context): Context {
    this.rules.forEach((rule) => {
      if (context.input.length === 0) {
        return;
      }

      if (rule.nine && context.startsWith(rule.nine)) {
        context.output += 9 * rule.multiplier;
        context.input = context.input.substring(2);
        console.log("Doing: ", rule.multiplier, "9", rule.nine);
      }

      if (rule.four && context.startsWith(rule.four)) {
        context.output += 4 * rule.multiplier;
        context.input = context.input.substring(2);
        console.log("Doing: ", rule.multiplier, "4", rule.four);
      }

      if (rule.five && context.startsWith(rule.five)) {
        context.output += 5 * rule.multiplier;
        context.input = context.input.substring(1);
        console.log("Doing: ", rule.multiplier, "5", rule.five);
      }

      while (rule.one && context.startsWith(rule.one)) {
        context.output += 1 * rule.multiplier;
        context.input = context.input.substring(1);
        console.log("Doing: ", rule.multiplier, "1", rule.one);
      }
    });

    return context;
  }
}

(() => {
  const interpreter = new Interpreter();
  interpreter.addRule(new Rule("thousand", "M", "", "", "", 1000));
  interpreter.addRule(new Rule("hundred", "C", "CD", "D", "CM", 100));
  interpreter.addRule(new Rule("ten", "X", "XL", "L", "XC", 10));
  interpreter.addRule(new Rule("one", "I", "IV", "V", "IX", 1));

  const cxt = new Context("MLXVI");
  interpreter.execute(cxt);

  console.log("Response: ", cxt.output);
})();
