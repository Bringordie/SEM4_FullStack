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
var _value;
// A)
function reverseArr(arr) {
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
class DataHolder {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
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
class DataHolder2 {
    constructor(value) {
        _value.set(this, void 0);
        __classPrivateFieldSet(this, _value, value);
    }
    get value() {
        return __classPrivateFieldGet(this, _value);
    }
    set value(value) {
        __classPrivateFieldSet(this, _value, value);
    }
}
_value = new WeakMap();
let d = new DataHolder2("Hello");
console.log(d.value);
d.value = "World";
console.log(d.value);
let d2 = new DataHolder2(123);
console.log(d2.value);
d2.value = 500;
console.log(d2.value);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ2VuZXJpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsS0FBSztBQUNMLFNBQVMsVUFBVSxDQUFJLEdBQVE7SUFDN0IsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdkIsQ0FBQztBQUNELGVBQWU7QUFDZix3Q0FBd0M7QUFDeEMsS0FBSztBQUNMLGVBQWU7QUFDZixrQ0FBa0M7QUFDbEMsS0FBSztBQUNMLGVBQWU7QUFDZiw2Q0FBNkM7QUFDN0MsS0FBSztBQUNMLGVBQWU7QUFDZix3Q0FBd0M7QUFDeEMsS0FBSztBQUVMLEtBQUs7QUFFTCxNQUFNLFVBQVU7SUFFZCxZQUFZLEtBQVE7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUNELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELFFBQVEsQ0FBQyxLQUFRO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBRUQsMkNBQTJDO0FBQzNDLDZCQUE2QjtBQUM3Qix1QkFBdUI7QUFDdkIsNkJBQTZCO0FBRTdCLHdDQUF3QztBQUN4Qyw4QkFBOEI7QUFDOUIsb0JBQW9CO0FBQ3BCLDhCQUE4QjtBQUU5Qix3Q0FBd0M7QUFDeEMsOEJBQThCO0FBQzlCLHNCQUFzQjtBQUN0Qiw4QkFBOEI7QUFFOUIsS0FBSztBQUNMLE1BQU0sV0FBVztJQUVmLFlBQVksS0FBUTtRQURwQix5QkFBVTtRQUVSLHVCQUFBLElBQUksVUFBVSxLQUFLLEVBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLDRDQUFtQjtJQUNyQixDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBUTtRQUNoQix1QkFBQSxJQUFJLFVBQVUsS0FBSyxFQUFDO0lBQ3RCLENBQUM7Q0FDRjs7QUFFRCxJQUFJLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBUyxPQUFPLENBQUMsQ0FBQztBQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztBQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVyQixJQUFJLEVBQUUsR0FBRyxJQUFJLFdBQVcsQ0FBUyxHQUFHLENBQUMsQ0FBQztBQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0QixFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=