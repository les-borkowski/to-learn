function convertToRoman(num) {

 
 let romArr = [];
 //convert num to an array of numbers and reverse it
 let charToNum = digit => Number(digit);

 let revArr = Array.from(String(num), charToNum).reverse();

 //console.log(newArr);
 // roman numerals array
 let romanNums = [['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], ['', 'M', 'MM', 'MMM', 'MMMM', 'MMMMM']];

//loop through reveresd array, put corresponding roman numeral at the front
for (let i = 0; i < revArr.length; i++) {
  romArr.unshift(romanNums[i][revArr[i]]);
}
// romArr to string
return romArr.join('');

}

convertToRoman(36);