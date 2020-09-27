"use strict";
//#Interfaces 1
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
var _title, _author, _published, _pages;
let http = require("http");
// B)
function bookInfo(book) {
    return ("Title: " +
        book.title +
        "\nAuthor: " +
        book.author +
        "\nPublished: " +
        book.published +
        "\nPages: " +
        book.pages);
}
// C)
// According to TypeScript, Duck-Typing is a method/rule used to check the type compatibility for
// more complex variable types. TypeScript uses the duck-typing method to compare one object with other
// objects by checking that both objects have the same type matching names or not.
// So for example, if we make a book object and provided the published date with something other than a "Date" it would complain and give an error.
// D)
let newBook = { title: "Title", author: "Author" };
bookInfo(newBook);
// E)
//newBook.author = "New author";
// F)
class Book {
    constructor(title, author, published, pages) {
        _title.set(this, void 0);
        _author.set(this, void 0);
        _published.set(this, void 0);
        _pages.set(this, void 0);
        __classPrivateFieldSet(this, _title, title);
        __classPrivateFieldSet(this, _author, author);
        __classPrivateFieldSet(this, _published, published);
        __classPrivateFieldSet(this, _pages, pages);
    }
    get title() {
        return __classPrivateFieldGet(this, _title);
    }
    get author() {
        return __classPrivateFieldGet(this, _author);
    }
    get published() {
        return __classPrivateFieldGet(this, _published);
    }
    get pages() {
        return __classPrivateFieldGet(this, _pages);
    }
}
_title = new WeakMap(), _author = new WeakMap(), _published = new WeakMap(), _pages = new WeakMap();
// B)
let arrayFromStrings = function (str1, str2, str3) {
    return Array.from(arguments);
};
//console.log(arrayFromStrings("a", "b", "c"));
// C)
let arrayUpperCase = function (str1, str2, str3) {
    let strArray = Array.from(arguments);
    return strArray.map((str) => str.toUpperCase());
};
//console.log(arrayUpperCase("a", "b", "c"));
// D)
let f2 = function logger(f1) {
    //Simulate that we get data from somewhere and uses the provided function
    let [a, b, c] = ["a", "b", "c"];
    console.log(f1(a, b, c));
};
// E)
f2(arrayFromStrings);
f2(arrayUpperCase);
// F)
let thisShouldFail = function (numbers, date, name) {
    return Array.from(arguments);
};
//f2(thisShouldFail);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUFFZixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFVM0IsS0FBSztBQUNMLFNBQVMsUUFBUSxDQUFDLElBQVc7SUFDM0IsT0FBTyxDQUNMLFNBQVM7UUFDVCxJQUFJLENBQUMsS0FBSztRQUNWLFlBQVk7UUFDWixJQUFJLENBQUMsTUFBTTtRQUNYLGVBQWU7UUFDZixJQUFJLENBQUMsU0FBUztRQUNkLFdBQVc7UUFDWCxJQUFJLENBQUMsS0FBSyxDQUNYLENBQUM7QUFDSixDQUFDO0FBRUQsS0FBSztBQUNMLGlHQUFpRztBQUNqRyx1R0FBdUc7QUFDdkcsa0ZBQWtGO0FBQ2xGLG1KQUFtSjtBQUVuSixLQUFLO0FBQ0wsSUFBSSxPQUFPLEdBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUMxRCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFbEIsS0FBSztBQUVMLGdDQUFnQztBQUVoQyxLQUFLO0FBRUwsTUFBTSxJQUFJO0lBTVIsWUFBWSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWdCLEVBQUUsS0FBYztRQUwzRSx5QkFBZTtRQUNmLDBCQUFnQjtRQUNoQiw2QkFBa0I7UUFDbEIseUJBQWdCO1FBR2QsdUJBQUEsSUFBSSxVQUFVLEtBQUssRUFBQztRQUNwQix1QkFBQSxJQUFJLFdBQVcsTUFBTSxFQUFDO1FBQ3RCLHVCQUFBLElBQUksY0FBYyxTQUFTLEVBQUM7UUFDNUIsdUJBQUEsSUFBSSxVQUFVLEtBQUssRUFBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsNENBQW1CO0lBQ3JCLENBQUM7SUFDRCxJQUFJLE1BQU07UUFDUiw2Q0FBb0I7SUFDdEIsQ0FBQztJQUNELElBQUksU0FBUztRQUNYLGdEQUF1QjtJQUN6QixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsNENBQW1CO0lBQ3JCLENBQUM7Q0FDRjs7QUFTRCxLQUFLO0FBQ0wsSUFBSSxnQkFBZ0IsR0FBVyxVQUM3QixJQUFZLEVBQ1osSUFBWSxFQUNaLElBQVk7SUFFWixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBRUYsK0NBQStDO0FBRS9DLEtBQUs7QUFDTCxJQUFJLGNBQWMsR0FBVyxVQUMzQixJQUFZLEVBQ1osSUFBWSxFQUNaLElBQVk7SUFFWixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDbEQsQ0FBQyxDQUFDO0FBQ0YsNkNBQTZDO0FBRTdDLEtBQUs7QUFDTCxJQUFJLEVBQUUsR0FBRyxTQUFTLE1BQU0sQ0FBQyxFQUFVO0lBQ2pDLHlFQUF5RTtJQUN6RSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQztBQUVGLEtBQUs7QUFDTCxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNyQixFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFbkIsS0FBSztBQUNMLElBQUksY0FBYyxHQUFHLFVBQVUsT0FBaUIsRUFBRSxJQUFVLEVBQUUsSUFBWTtJQUN4RSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBRUYscUJBQXFCIn0=