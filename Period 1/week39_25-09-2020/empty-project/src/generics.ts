// A)
function reverseArr<T>(arr: T[]): T[] {
  return arr.reverse();
}
// console.log(
//   reverseArr<string>(["a", "b", "c"])
// );
// console.log(
//   reverseArr<number>([1, 2, 3])
// );
// console.log(
//   reverseArr<boolean>([true, true, false])
// );
// console.log(
//   reverseArr<number>(["a", "b", "c"])
// );

// B)

class DataHolder<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
  getValue(): T {
    return this.value;
  }
  setValue(value: T) {
    this.value = value;
  }
}

// let d = new DataHolder<string>("Hello");
// console.log(d.getValue());
// d.setValue("World");
// console.log(d.getValue());

// let d2 = new DataHolder<number>(123);
// console.log(d2.getValue());
// d2.setValue(500);
// console.log(d2.getValue());

// let d3 = new DataHolder<number>(123);
// console.log(d3.getValue());
// d3.setValue("500");
// console.log(d3.getValue());

// C)
class DataHolder2<T> {
  #value: T;
  constructor(value: T) {
    this.#value = value;
  }
  get value(): T {
    return this.#value;
  }
  set value(value: T) {
    this.#value = value;
  }
}

// let d = new DataHolder2<string>("Hello");
// console.log(d.value);
// d.value = "World";
// console.log(d.value);

// let d2 = new DataHolder2<number>(123);
// console.log(d2.value);
// d2.value = 500;
// console.log(d2.value);
