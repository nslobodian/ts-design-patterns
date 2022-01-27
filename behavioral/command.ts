type CommandAction = (x: string, y: string) => string;

class Command {
  public name: string;

  constructor(
    public execute: CommandAction,
    public undo: CommandAction,
    public value: string
  ) {}
}

function add(x: string, y: string): string {
  return x.concat(y);
}

function remove(x: string, y: string): string {
  return x
    .split("")
    .reverse()
    .join("")
    .replace(y, "")
    .split("")
    .reverse()
    .join("");
}

class AddCommand extends Command {
  public name: string = "Add";

  constructor(value: string) {
    super(add, remove, value);
  }
}

class RemoveCommand extends Command {
  public name: string = "Remove";

  constructor(value: string) {
    super(remove, add, value);
  }
}

class CommandReceiver {
  private value: string = "";
  private history: Command[] = [];

  execute(command: Command): void {
    this.value = command.execute(this.value, command.value);
    this.history.push(command);
    console.log(`Execute ${command.name} with value ${command.value}`);
  }

  undo(): void {
    const command = this.history.pop();
    if (!command) {
      return;
    }

    this.value = command.undo(this.value, command.value);

    console.log(`Execute ${command.name} with value ${command.value}`);
  }

  getCurrentValue(): string {
    return this.value;
  }
}

(() => {
  const receiver = new CommandReceiver();

  receiver.execute(new AddCommand("a"));
  receiver.execute(new AddCommand("b"));
  receiver.execute(new AddCommand("a"));

  console.log("Current value: " + receiver.getCurrentValue());

  receiver.undo();

  console.log("Current value: " + receiver.getCurrentValue());
})();
