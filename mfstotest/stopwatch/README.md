# Stopwatch

#### Description
**Stopwatch** app written in Javascript. Displays time that passed from pressing *Start* button
 in hours, minutes, seconds, and centiseconds. All data is stored in browser's local storage, can be accessed after closing the app. 
 
#### Usage
Open index.html in browser, stopwatch is ready to go.
Operate using *Start*, *Pause*, *Reset*, *Lap* buttons.
button *Lap History Reset* resets lap history.
Pressing *Reset* before closing the app window will clear any local storage written by the app.
*Lap* buttons measures time between pressing *Lap* or *Stop*. Laps are displayed under the stopwatch. At the moment there is no limit for the displayed laps.

#### Files
*index.html* -- html file containing the app
*style.css* -- contains css styling
*script.js* -- contains scripts and logic for the app

#### Accuracy test
Stopwatch includes function measuring accuracy using timestamps taken during starting and pausing. Data is printed to the console. Tests show its is accurate as long as the app is displayed and script is running.

      *Timestamps difference:  00:04:26:82*
      *App timer:  00:04:26:80*
      *Timestamps difference:  00:10:01:33*
      *App timer:  00:10:01:27*



Les Borkowski 2021