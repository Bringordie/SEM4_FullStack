"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _radius, _height;
// A)
class Shape {
    constructor(color) {
        this._color = color;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    toString() {
        return `Color: ${this._color} \nArea: ${this.area} \nPerimiter: ${this.perimeter}`;
    }
}
// B)
class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        _radius.set(this, void 0);
        __classPrivateFieldSet(this, _radius, radius);
    }
    get area() {
        //pi * radius^2
        return Math.PI * Math.pow(__classPrivateFieldGet(this, _radius), 2);
    }
    get perimeter() {
        //diameter * pi
        return __classPrivateFieldGet(this, _radius) * 2 * Math.PI;
    }
    get radius() {
        return __classPrivateFieldGet(this, _radius);
    }
    set radius(radius) {
        __classPrivateFieldSet(this, _radius, radius);
    }
}
_radius = new WeakMap();
let demoCircle = new Circle("Green", 5);
// console.log(demoCircle.toString());
// demoCircle.radius = 25;
// console.log(demoCircle.radius);
// console.log(demoCircle.area);
// console.log(demoCircle.perimeter);
// C)
class Cylinder extends Circle {
    constructor(color, radius, height) {
        super(color, radius);
        _height.set(this, void 0);
        __classPrivateFieldSet(this, _height, height);
    }
    get volume() {
        //area * height
        return this.area * __classPrivateFieldGet(this, _height);
    }
    get perimeter() {
        throw new Error("not implemented.");
    }
    get height() {
        return __classPrivateFieldGet(this, _height);
    }
    set height(height) {
        __classPrivateFieldSet(this, _height, height);
    }
}
_height = new WeakMap();
let demoCylinder = new Cylinder("green", 5, 5);
//console.log(demoCylinder.volume);
//demoCylinder.height = 10;
//console.log(demoCylinder.height);
//console.log(demoCylinder.perimeter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlc19hbmRfaW5oZXJpdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2xhc3Nlc19hbmRfaW5oZXJpdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsS0FBSztBQUNMLE1BQWUsS0FBSztJQVFsQixZQUFZLEtBQWE7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQVJELElBQVcsS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBVyxLQUFLLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBT0QsUUFBUTtRQUNOLE9BQU8sVUFBVSxJQUFJLENBQUMsTUFBTSxZQUFZLElBQUksQ0FBQyxJQUFJLGlCQUFpQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckYsQ0FBQztDQUNGO0FBRUQsS0FBSztBQUVMLE1BQU0sTUFBTyxTQUFRLEtBQUs7SUFFeEIsWUFBWSxLQUFhLEVBQUUsTUFBYztRQUN2QyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFGZiwwQkFBZ0I7UUFHZCx1QkFBQSxJQUFJLFdBQVcsTUFBTSxFQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixlQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsRUFBRSxHQUFHLGdEQUFnQixDQUFDLENBQUEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsSUFBSSxTQUFTO1FBQ1gsZUFBZTtRQUNmLE9BQU8sd0NBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUNELElBQUksTUFBTTtRQUNSLDZDQUFvQjtJQUN0QixDQUFDO0lBQ0QsSUFBSSxNQUFNLENBQUMsTUFBYztRQUN2Qix1QkFBQSxJQUFJLFdBQVcsTUFBTSxFQUFDO0lBQ3hCLENBQUM7Q0FDRjs7QUFFRCxJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEMsc0NBQXNDO0FBQ3RDLDBCQUEwQjtBQUMxQixrQ0FBa0M7QUFDbEMsZ0NBQWdDO0FBQ2hDLHFDQUFxQztBQUVyQyxLQUFLO0FBQ0wsTUFBTSxRQUFTLFNBQVEsTUFBTTtJQUUzQixZQUFZLEtBQWEsRUFBRSxNQUFjLEVBQUUsTUFBYztRQUN2RCxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRnZCLDBCQUFnQjtRQUdkLHVCQUFBLElBQUksV0FBVyxNQUFNLEVBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksTUFBTTtRQUNSLGVBQWU7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLHdDQUFlLENBQUM7SUFDbEMsQ0FBQztJQUNELElBQUksU0FBUztRQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ1IsNkNBQW9CO0lBQ3RCLENBQUM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFjO1FBQ3ZCLHVCQUFBLElBQUksV0FBVyxNQUFNLEVBQUM7SUFDeEIsQ0FBQztDQUNGOztBQUVELElBQUksWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0MsbUNBQW1DO0FBQ25DLDJCQUEyQjtBQUMzQixtQ0FBbUM7QUFDbkMsc0NBQXNDIn0=