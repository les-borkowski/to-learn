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


// define lap times array, check for local storage and load if exists
let lapTimesArray = [];
localStorage["laps"] ? lapTimesArray = JSON.parse(localStorage["laps"]) : lapTimesArray = [];
lapHistory(lapTimesArray);

// define timer and check local storage for stored value
let timerCount = 0;
let lapInitialTimer = 0;
localStorage["timer"] ? timerCount = JSON.parse(localStorage["timer"]) : timerCount = 0;

// initialize display
stopwatch.innerText = formatTimer(timerCount);

//  stopwatch - update and display 
let timerPass = setInterval(updateTimerCount, 10);
let timerControl = false;

function updateTimerCount() {
  if (timerControl) {
    timerCount++;
    stopwatch.innerText = formatTimer(timerCount);
  }
}

// format stopwatch display
function formatTimer(time) {

  // convert values to h:m:s:cs
  const h = Math.floor(time / 360000) % 60;
  const m = Math.floor(time / 6000) % 60;
  const s = Math.floor(time / 100) % 60;
  const cs = Math.floor(time) % 100;

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
    } else if ((lap === slowest)) {
      return (`<li class="slowest">${formatTimer(lap)}</li>`)
    } else {
      return (`<li>${formatTimer(lap)}</li>`)
    } 
  }).join("")
};

// Stopwatch controls
function startTimer() {
  timerControl = true;

  // FOR ACCURACY TEST ONLY
  initTime = getCurrTime();
};

// Save timer to local storage on stop
function stopTimer() {
  timerControl = false;
  localStorage["timer"] = JSON.stringify(timerCount);

  // FOR ACCURACY TEST ONLY
  stopTime = getCurrTime();
  calaculatePassedTime();
  initTime = stopTime;

}
// Reset timer and laps history
function resetTimer() {
  timerCount = 0;
  lapInitialTimer = 0;
  stopwatch.innerText = formatTimer(timerCount);
  resetLapsHistory();
  // clear local storage
  localStorage.clear();

  // FOR ACCURACY TEST ONLY
  initTime = 0;
  stopTime = 0;
  totalPassedTime = 0;

}
// get time elapsed from last lap click or a stop
function getLapTime() {

  if (timerCount !== 0) {
    // get lap time
    let lapTime = timerCount - lapInitialTimer;
    lapInitialTimer = timerCount;
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

// FOR ACCURACY TEST ONLY

let initTime = 0;
let stopTime = 0;
let totalPassedTime = 0;

function getCurrTime() {
  let currentDate = new Date();
  return currentDate.getTime();
  
};
function calaculatePassedTime() {
  let passedTime = (stopTime - initTime) / 10;
  totalPassedTime += passedTime;
  console.log("Timestamp difference: ", formatTimer(totalPassedTime));
  console.log("App timer: ", formatTimer(timerCount));
}


// Event listeners
btnStart.addEventListener('click', () => startTimer());
btnPause.addEventListener('click', () => stopTimer());
btnReset.addEventListener('click', () => resetTimer());
btnLap.addEventListener('click', () => getLapTime());
btnLapsReset.addEventListener('click', () => resetLapsHistory());