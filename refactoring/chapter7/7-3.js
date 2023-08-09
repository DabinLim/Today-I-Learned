// 기본형을 객체로 바꾸기

class Order {
  constructor(data) {
    this.priority = data.priority;
  }

  get priorityString() {
    return this._priority.toString();
  }

  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

class Priority {
  constructor(value) {
    this._value = value;
  }

  toString() {
    return this._value;
  }

  get _index() {
    return Priority.legalValues().findIndex((s) => s === this._value);
  }

  static legalValues() {
    return ["low", "normal", "high", "rush"];
  }

  equals(other) {
    return this._index === other._index;
  }

  higherThan(other) {
    return this._index > other._index;
  }

  lowerThan(other) {
    return this._index < other._index;
  }
}

const orders = [
  new Order({ priority: "high" }),
  new Order({ priority: "rush" }),
  new Order({ priority: "low" }),
  new Order({ priority: "normal" }),
];


const highPriorityCount = orders.filter((o) =>
  o.priority.higherThan(new Priority("normal").toString())
).length;
