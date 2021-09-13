const SAMPLE_LAPTIMES = ["0:59:24:00", "0:58:49:04", "1:28:45:98", "1:08:37:65"];

//  DOM elements
let stopwatch = document.getElementById('timer')
let btnStart = document.getElementById('btnStart')
let btnStop = document.getElementById('btnStop')
let btnReset = document.getElementById('btnReset')
let btnLap = document.getElementById('btnLap')
let btnLapsReset = document.getElementById('btnLapsReset')
let lapTimesList = document.getElementById("lapTimesList")

// define lap times array, check for local storage and load if exists
let lapTimesArray = [];
localStorage["laps"] ? lapTimesArray = JSON.parse(localStorage["laps"]) : lapTimesArray = [];
lapHistory(lapTimesArray);
// define timer and check local storage for stred value
let timer = 0;
localStorage["timer"] ? timer = JSON.parse(localStorage["timer"]) : timer = 0;

// functions
// TODO: this solution is not accurate

let timerPass = setInterval(displayTimer, 10);
let timerControl = false;

function displayTimer () {

  const hours = Math.floor(timer / 360000) % 60;
  const m = Math.floor(timer / 6000) % 60;
  const s = Math.floor(timer / 100) % 60;
  const cs = Math.floor(timer) % 100;

  let mins = m < 10 ? "0" + m : m;
  let secs = s < 10 ? "0" + s : s;
  let centisecs = cs < 10 ? "0" + cs : cs;

  stopwatch.innerText = `${hours}:${mins}:${secs}:${centisecs}`;

  if (timerControl) {
    timer++;
  }

}

// Stopwatch controls

function startTimer() {
  timerControl = true;
}
// Save timer to local storage on stop
function stopTimer() {
  timerControl = false;
  localStorage["timer"] = JSON.stringify(timer);
}
// Reset timer and laps history
function resetTimer() {
  timer = 0;
  resetLapsHistory();
}
// update laps array, save to local storage
function getLapTime() {
  if (timer !== 0) {
  lapTimesArray.unshift(stopwatch.innerText);
  lapHistory(lapTimesArray);
  localStorage["laps"] = JSON.stringify(lapTimesArray);
  }
}

function resetLapsHistory() {
  if(!timerControl) {
    lapTimesArray = [];
    lapHistory(lapTimesArray);
  }
}

// TODO: add information about lap number -- Extra
// TODO: limit info to last 10 laps only -- Extra
function lapHistory(lapsData) {
  lapTimesList.innerHTML = lapsData
  .map((lap) => {
   return (`<li>${lap}</li>`)
  }).join("")
};


//  event listeners
btnStart.addEventListener('click', () => startTimer());
btnStop.addEventListener('click', () => stopTimer());
btnReset.addEventListener('click', () => resetTimer());
btnLap.addEventListener('click', () => getLapTime());
btnLapsReset.addEventListener('click', () => resetLapsHistory());