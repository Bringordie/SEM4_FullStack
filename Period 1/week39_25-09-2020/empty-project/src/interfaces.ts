//#Interfaces 1

// A)
interface IBook {
  title: string;
  readonly author: string;
  published?: Date;
  pages?: Number;
}

// B)
function bookInfo(book: IBook) {
  return (
    "Title: " +
    book.title +
    "\nAuthor: " +
    book.author +
    "\nPublished: " +
    book.published +
    "\nPages: " +
    book.pages
  );
}

// C)
// According to TypeScript, Duck-Typing is a method/rule used to check the type compatibility for
// more complex variable types. TypeScript uses the duck-typing method to compare one object with other
// objects by checking that both objects have the same type matching names or not.
// So for example, if we make a book object and provided the published date with something other than a "Date" it would complain and give an error.

// D)
let newBook: IBook = { title: "Title", author: "Author" };
bookInfo(newBook);

// E)

//newBook.author = "New author";

// F)

class Book implements IBook {
  #title: string;
  #author: string;
  #published?: Date;
  #pages?: number;

  constructor(title: string, author: string, published?: Date, pages?: number) {
    this.#title = title;
    this.#author = author;
    this.#published = published;
    this.#pages = pages;
  }

  get title(): string {
    return this.#title;
  }
  get author(): string {
    return this.#author;
  }
  get published(): Date | undefined {
    return this.#published;
  }
  get pages(): number | undefined {
    return this.#pages;
  }
}

// # Interfaces 2 (Function types)

// A)
interface myFunc {
  (str1: string, str2: string, str3: string): string[];
}

// B)
let arrayFromStrings: myFunc = function (
  str1: string,
  str2: string,
  str3: string
) {
  return Array.from(arguments);
};

//console.log(arrayFromStrings("a", "b", "c"));

// C)
let arrayUpperCase: myFunc = function (
  str1: string,
  str2: string,
  str3: string
) {
  let strArray = Array.from(arguments);
  return strArray.map((str) => str.toUpperCase());
};
//console.log(arrayUpperCase("a", "b", "c"));

// D)
let f2 = function logger(f1: myFunc) {
  //Simulate that we get data from somewhere and uses the provided function
  let [a, b, c] = ["a", "b", "c"];
  console.log(f1(a, b, c));
};

// E)
f2(arrayFromStrings);
f2(arrayUpperCase);

// F)
let thisShouldFail = function (numbers: number[], date: Date, name: string) {
  return Array.from(arguments);
};

//f2(thisShouldFail);
