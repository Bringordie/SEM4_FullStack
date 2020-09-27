// A)
abstract class Shape {
  private _color: string;
  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    this._color = value;
  }
  constructor(color: string) {
    this._color = color;
  }
  abstract get area(): number;
  abstract get perimeter(): number;

  toString(): string {
    return `Color: ${this._color} \nArea: ${this.area} \nPerimiter: ${this.perimeter}`;
  }
}

// B)

class Circle extends Shape {
  #radius: number;
  constructor(color: string, radius: number) {
    super(color);
    this.#radius = radius;
  }
  get area(): number {
    //pi * radius^2
    return Math.PI * this.#radius ** 2;
  }
  get perimeter(): number {
    //diameter * pi
    return this.#radius * 2 * Math.PI;
  }
  get radius(): number {
    return this.#radius;
  }
  set radius(radius: number) {
    this.#radius = radius;
  }
}

let demoCircle = new Circle("Green", 5);
// console.log(demoCircle.toString());
// demoCircle.radius = 25;
// console.log(demoCircle.radius);
// console.log(demoCircle.area);
// console.log(demoCircle.perimeter);

// C)
class Cylinder extends Circle {
  #height: number;
  constructor(color: string, radius: number, height: number) {
    super(color, radius);
    this.#height = height;
  }
  get volume(): number {
    //area * height
    return this.area * this.#height;
  }
  get perimeter(): number {
    throw new Error("not implemented.");
  }
  get height(): number {
    return this.#height;
  }
  set height(height: number) {
    this.#height = height;
  }
}

let demoCylinder = new Cylinder("green", 5, 5);
//console.log(demoCylinder.volume);
//demoCylinder.height = 10;
//console.log(demoCylinder.height);
//console.log(demoCylinder.perimeter);
