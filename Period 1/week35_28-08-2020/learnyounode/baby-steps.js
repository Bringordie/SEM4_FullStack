let input = process.argv;

let return_output = process.argv.splice(0, 2);

let sum = 0;

input.forEach((i) => {
  if (i != undefined) {
    sum = parseInt(i) + parseInt(sum);
  }
});

console.log(sum);
