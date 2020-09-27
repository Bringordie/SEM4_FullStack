import * as _ from "lodash";

/* 
    Remember:  
    npm install lodash
    npm install @types /lodash
*/

let numbers: number[] = [1, 2, 4, 5];

let shuffle = _.shuffle(numbers);

let reversed: Array<number> = _.reverse(shuffle);

console.log(reversed);
