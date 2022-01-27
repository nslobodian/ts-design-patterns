const events = require("events");

const CLICK = "click";

class MyEmitter extends events.EventEmitter {}

function clickHandler2() {
  console.log("Click handler 2");
}

function clickHandler1() {
  console.log("Click handler 1");
}

(() => {
  const emitter = new MyEmitter();

  emitter.once("newListener", (event: string) => {
    if (event === CLICK) {
      emitter.on(CLICK, () => {
        console.log("Before click handlers");
      });
    }
  });

  emitter.addListener(CLICK, clickHandler1);
  emitter.addListener(CLICK, clickHandler2);

  emitter.emit(CLICK);

  emitter.removeListener(CLICK, clickHandler1);

  emitter.emit(CLICK);
})();
