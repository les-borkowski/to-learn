function checkCashRegister(price, cash, cid) {

//variables and initial calculations
let cidSum = Math.round(cid.reduce((total, value, index) => total += cid[index][1], 0) * 100);
let changeDue = Math.round((cash - price) * 100);

console.log(changeDue)
//console.log(cidSum)

let coinValues = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
let cid100 = cid.map((item, index) => ([coinValues[index], Math.round(cid[index][1] * 100)]));
let cidValues = cid.map((item, index) => ([coinValues[index], coinValues[index]]));
let coinNames = cid.map((item, index) => ([coinValues[index], cid[index][0]]));


//objects
let cashInCents = Object.fromEntries(cid100);
let cashValues = Object.fromEntries(cidValues);
let cashNames = Object.fromEntries(coinNames);

let changeWallet = {};
let result = { "status": "", change: []}

//console.log(cashInCents)
//coin counter
let changeDueCopy = changeDue;
//console.log(changeDueCopy)

while (changeDueCopy > 0) {
    //find highest denomination

    let maxDenArr = coinValues.reverse().filter(num => (num <= changeDueCopy) && cashInCents[num] != 0);
    let maxDen = Math.max(...maxDenArr);
    /* old solution
    let maxDen = Number(Object.entries(cashValues)
                    .filter(([prop, value]) => (value <= changeDueCopy))
                    .map (num => num[1])
                    .sort((a,b) => (b > a ? 1 : -1))
                    .slice(0,1));
    */
    //console.log(maxDen);
    //console.log(changeDueCopy);

    if(!changeWallet.hasOwnProperty(cashNames[maxDen]) && cashInCents[maxDen] > 0) {
      changeWallet[cashNames[maxDen]] = cashValues[maxDen];
          
    } else if (changeWallet.hasOwnProperty(cashNames[maxDen]) && cashInCents[maxDen] > 0) {
      changeWallet[cashNames[maxDen]] += cashValues[maxDen];
       
    }
    cashInCents[maxDen] -= cashValues[maxDen];
    changeDueCopy -= cashValues[maxDen];
    

    //console.log(changeWallet)
    //console.log(changeDueCopy)

}
//console.log(changeWallet)
//convert changeWallet to an array and divide value by 100
let finalChange = Object.entries(changeWallet).map((val, index) => [Object.entries(changeWallet)[index][0], (Object.entries(changeWallet)[index][1])/100]);

//console.log(finalChange);

//calculate sum of coins in the wallet, with value smaller than chagneDue
let finalCoinsSum = finalChange.reduce((total, value, index) => total += Math.round((finalChange[index][1])*100), 0);

console.log(finalCoinsSum);


//console.log(finalChange)

//main function logic
if(changeDue > finalCoinsSum) {
  result.status = "INSUFFICIENT_FUNDS"
  result.change = []
} else if (changeDue == cidSum) {
  result.status = "CLOSED"
  result.change = cid;
} else {
  result.status = "OPEN"
  result.change = finalChange.slice()
}

//function output
console.log(result);
return result;  
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])