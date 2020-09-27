function loggerV1(a: any, b: any) {
  console.log(`Value-1: ${a}, Value-2: ${b}`);
}

let n1 = 45;
let s1 = "Hello Class";
//loggerV1(n1, s1);

function loggerV2(a: number, b: string): void {
  console.log(`Value-1: ${a}, Value-2: ${b}`);
}

//loggerV2(n1, s1);

function loggerV3(a: number, b: string): string {
  return `Value-1: ${a}, Value-2: ${b}`;
}

//console.log(loggerV3(n1, s1));

interface IPerson {
  name: string;
}

interface IAddress {
  street: string;
}

function loggerV4(a: IPerson, b: IAddress): void {
  console.log(`Value-1: ${a.name}, Value-2: ${b.street}`);
}

//loggerV4({ name: "Kurt Wonnegut" }, { street: "Lyngby 67" });

class Address implements IAddress {
  private _street: string;
  constructor(street: string) {
    this._street = street;
  }
  get street(): string {
    return this._street;
  }

  set street(street: string) {
    this._street = street;
  }

  toString(): string {
    return this._street;
  }
}

class Person implements IPerson {
  #name: string;
  constructor(name: string) {
    this.#name = name;
  }

  get name(): string {
    return this.#name;
  }

  set name(name: string) {
    this.#name = name;
  }

  toString(): string {
    return this.#name;
  }
}

let p1 = new Person("Kurt Wonnegut");
let a1 = new Address("Lyngbyvej 45");

//loggerV4(p1, a1);

/* NOT THE WAY TO DO IT -- TOO GENERIC, same as first example
function loggerv5<T, U>(a: T, b: U) {
  console.log(`Value-1: ${a}, Value-2: ${b}`);
}

loggerv5(4, "hello");
loggerv5(p1, a1);
loggerv5(a1, p1);
*/

// This is what we will like to "do"
// let numbers: number[] = [];
// let names: string[];
// let results: boolean[];

class GenericLogger<T, U> {
  log = (a: T, b: U) => {
    console.log(`Value-1: ${a}, Value-2: ${b}`);
  };
}

const numberLogger = new GenericLogger<number, number>();
const personAddressLogger = new GenericLogger<IPerson, IAddress>();

numberLogger.log(34, 56);
personAddressLogger.log(p1, a1);
