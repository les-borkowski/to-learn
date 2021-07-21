function rot13(str) {
  //create an array of unicode numbers
  let codesArr = [];
  
  for (let i = 0; i < str.length; i++) {
    codesArr.push(str.charCodeAt(i));
  }
  //console.log(codesArr);

  // change value of unicode number by -13
  for (let j=0; j<codesArr.length; j++) {
    if (codesArr[j] >=65 && codesArr[j] <= 90)
    {
      codesArr[j] -= 13;
      // fix the result if unicode no. is smaller than 65
       if(codesArr[j] < 65) {
         codesArr[j] += 26;      }
    }
  }
  //console.log(codesArr);

  //merge the array to a string of letters
  let endStr = String.fromCharCode(...codesArr);

  //console.log(endStr)
  return endStr;
}

rot13("SERR PBQR PNZC");