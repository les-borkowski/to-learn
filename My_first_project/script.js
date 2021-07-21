const timer = document.getElementById("timer");
const select = document.getElementById("range");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

let info = document.getElementById('info');
let quote_container = document.getElementsByClassName('.quote');


//time

let timer_count = select.value * 60;
let timePassBy = setInterval(updateTimer, 1000);
let timeChange = true;



// update timer
function updateTimer() {
  const m = Math.floor(timer_count / 60) % 60;
  const s = Math.floor(timer_count) % 60;

  let mins = m < 10 ? "0" + m : m;
  let secs = s < 10 ? "0" + s : s;

  timer.innerHTML = `<h1>${mins}:${secs}</h1>`;

  if (timeChange === true) {
    timer_count--;
  }

  function swapQuotes() {
    if (timer_count === 0) {
      stopTimer();
      clearQuote();
      displayRandomQuote();
      setTimer();
      startTimer();
    }
  }
  
  swapQuotes();
}
//fetch random quotes from Quotes Free API (freeCodeCamp)
function getQuotes() {
  fetch("https://type.fit/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      let myQuotes = JSON.stringify(data);
      localStorage.setItem("quotes", myQuotes);
      // console.log(myQuotes);
    });
}

//get quotes from API if local storage empty 
if(!localStorage.getItem("quotes")) {
  getQuotes();
} else {
  storedQuotes = JSON.parse(localStorage.getItem("quotes"));
}


//display random quote in DOM
function displayRandomQuote() {
  //choose random quote
  let chosenQuote =
    storedQuotes[Math.floor(Math.random() * storedQuotes.length)];
  //generate html code
  let quoteDiv = document.createElement('div');
  quoteDiv.innerHTML = `
  <div class="quote">
  <p class="text"><strong>"${chosenQuote.text}"<strong></p>
  <p class="author">- ${chosenQuote.author}</p>
  </div>
  `;
  //put quote into the DOM
    info.appendChild(quoteDiv);
}
displayRandomQuote();

// remove quote
function clearQuote() {
  info.innerHTML = '';
}




// timer button functions

function startTimer() {
  timeChange = true;
}
function stopTimer() {
  timeChange = false;
}
function setTimer() {
  timer_count = select.value * 60;
}

//event listeners

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", setTimer);

select.addEventListener("change", setTimer);
