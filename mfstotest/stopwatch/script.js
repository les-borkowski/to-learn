// sample laps array for styling
// const SAMPLE_LAPTIMES = ["0:59:24:00", "0:58:49:04", "1:28:45:98", "1:08:37:65"];

//  DOM elements
let stopwatch = document.getElementById('timer')
let btnStart = document.getElementById('btnStart')
let btnPause = document.getElementById('btnPause')
let btnReset = document.getElementById('btnReset')
let btnLap = document.getElementById('btnLap')
let btnLapsReset = document.getElementById('btnLapsReset')
let lapTimesList = document.getElementById("lapTimesList")

// element.classList.add("className");


// Intitial stopwatch values
let initTime = 0;
let stopTime = 0;
let totalPassedTime = 0;
let lapInitialTimer = 0;

// define lap times array, check for local storage and load if exists
let lapTimesArray = [];
localStorage["laps"] ? lapTimesArray = JSON.parse(localStorage["laps"]) : lapTimesArray = [];
lapHistory(lapTimesArray);

// check local storage for stored stopwatch value 
localStorage["timer"] ? totalPassedTime = JSON.parse(localStorage["timer"]) : totalPassedTime = 0;

// initialize display
stopwatch.innerText = formatTimer(totalPassedTime);


// format stopwatch display
function formatTimer(time) {

  // convert values to h:m:s:cs
  const h = Math.floor(time / 3600000) % 60;
  const m = Math.floor(time / 60000) % 60;
  const s = Math.floor(time / 1000) % 60;
  const cs = Math.floor(time / 10) % 100;
  // keep stopwatch formatting if number < 10
  let hours = h < 10 ? "0" + h : h;
  let mins = m < 10 ? "0" + m : m;
  let secs = s < 10 ? "0" + s : s;
  let centisecs = cs < 10 ? "0" + cs : cs;

  return `${hours}:${mins}:${secs}:${centisecs}`;
};

// display laps from lap history array, indicate slowest and fastest
function lapHistory(lapsData) {  

  let fastest = Math.min(...lapsData);
  let slowest = Math.max(...lapsData);

  lapTimesList.innerHTML = lapsData
  .map((lap) => {
    if (lap === fastest) {
      return (`<li class="fastest">${formatTimer(lap)}</li>`)
    } else if (lap === slowest) {
      return (`<li class="slowest">${formatTimer(lap)}</li>`)
    } else {
      return (`<li>${formatTimer(lap)}</li>`)
    } 
  }).join("")
};

// BUTTON FUNCTIONS

// Start timer
function startTimer() {

  timerControl = true;
  initTime = getCurrTime();
  btnReset.classList.add("inactive");
  btnLap.classList.remove("inactive");
};

// Stop timer and update local storage
function stopTimer() {

  timerControl = false;
  stopTime = getCurrTime();
  totalPassedTime += calcPassedTime(initTime, stopTime);
  localStorage["timer"] = JSON.stringify(totalPassedTime);
  lapInitialTimer = 0;
  
  initTime = stopTime;
  btnReset.classList.remove("inactive");
  btnLap.classList.add("inactive");
}

// Reset timer and laps history
function resetTimer() {
  
  if(!timerControl) {
    initTime = 0;
    stopTime = 0;
    totalPassedTime = 0;
    lapInitialTimer = 0;
    stopwatch.innerText = formatTimer(totalPassedTime);
    resetLapsHistory();
    
    // clear local storage
    localStorage.clear();
  }
}



// get time elapsed from last lap click or a stop
function getLapTime() {

  if (initTime !== 0 && timerControl) {
    // get lap time
    clickTime = getCurrTime();
    let passedTime = calcPassedTime(initTime, clickTime)
    let lapTime = passedTime - lapInitialTimer;

    lapInitialTimer = passedTime;
    // update and store lap times array, unless laptime == 0
    if (lapTime !== 0) {
      lapTimesArray.unshift(lapTime);
      lapHistory(lapTimesArray);
      localStorage["laps"] = JSON.stringify(lapTimesArray);
    }
  }
};

// reset laps history
function resetLapsHistory() {
  if(!timerControl) {
    lapTimesArray = [];
    lapHistory(lapTimesArray);
  }
};

// TIME FUNCTIONS
// get current timestamp
function getCurrTime() {
  let currentDate = new Date();
  return currentDate.getTime();  
};

// calculate passed time
function calcPassedTime(startTime, stopTime) {
  let passedTime = (stopTime - startTime);
  return passedTime;
};


// DISPLAY FUNCTIONS
//  stopwatch - update and display 
let timerPass = setInterval(updateTimerCount, 10);
let timerControl = false;



function updateTimerCount() {
  // UPDATED FUNCTION HERE
  if (timerControl) {
    let currentTime = getCurrTime();
    let passedTime = calcPassedTime(initTime, currentTime);
    stopwatch.innerText = formatTimer(passedTime + totalPassedTime);
  }

}

// Event listeners
btnStart.addEventListener('click', () => startTimer());
btnPause.addEventListener('click', () => stopTimer());
btnReset.addEventListener('click', () => resetTimer());
btnLap.addEventListener('click', () => getLapTime());
btnLapsReset.addEventListener('click', () => resetLapsHistory());