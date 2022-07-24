let startingNumber = "12345";
let previous = startingNumber;
let result = 1;
let notFound = 0;
let thePreviousPrevious = startingNumber;
while (notFound == 0) {
  result = calculate(previous);
    if (result == previous || thePreviousPrevious == result) notFound = 1;

   thePreviousPrevious = previous;
  previous = result;
}
console.log(result);
function calculate(theNumber) {
  //   order desc and asc and subtract and return the result
  arr1 = theNumber
    .split("")
    .sort((a, b) => {
      return b - a;
    })
    .join("");
  arr2 = theNumber
    .split("")
    .sort((a, b) => {
      return a - b;
    })
    .join("");
  calc = arr1 - arr2;

    calc = calc.toString();
    if (calc.length < startingNumber.length) calc = "0".repeat(startingNumber.length - calc.length) + calc;

  console.log(arr1, " - ", arr2, " = ", calc);
  return calc;
}
