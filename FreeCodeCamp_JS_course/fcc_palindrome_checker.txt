function palindrome(str) {
  // copy input string, remove unnecessary characters
  let inputStr = str.slice();
  let regex = /[^a-z0-9]/gi
  let newStr = str.replace(regex, "").toLowerCase();

  //console.log(inputStr);
  //console.log(newStr);

  // reverse the string
  let revStr = ""

  for (let i = newStr.length -1; i>=0; i--) {
    revStr += newStr[i];
  }
  //console.log(revStr);

  // compare cleaned string and reversed string
  
  return (newStr === revStr) ? true : false;
  
  
}

palindrome("race car");