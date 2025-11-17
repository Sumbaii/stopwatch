const hoursText = document.getElementById("hours");
const minutesText = document.getElementById("minutes");
const secondsText = document.getElementById("seconds");
const hundredthsText = document.getElementById("hundredths");

const startStopImage = document.getElementById("startStopImage");

const startStopButton = document.getElementById("start-stop");
const resetButton = document.getElementById("reset");

let startTime = 0;
let elapsedTime = 0;
let running = false;

function getTimeComponents(time) {   // time is in milliseconds
    // These are conversions to extract time components
    // Math.floor() always rounds down to nearest integer

    // (time % 1000) get remainder milliseconds after whole seconds and then it gets divided by 10 to get hundredth seconds
    const hundredths = Math.floor((time % 1000) / 10);

    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return { hours, minutes, seconds, hundredths };
};

function updateDisplay() {
    const time = Date.now() - startTime + elapsedTime;
    const {hours, minutes, seconds, hundredths} = getTimeComponents(time)

    // String(...) converts number to text
    // .padStart(2, '0') formats it as 2 digit number so for example, 5 becomes 05
    hoursText.textContent = String(hours).padStart(2, '0');
    minutesText.textContent = String(minutes).padStart(2, '0');
    secondsText.textContent = String(seconds).padStart(2, '0');
    hundredthsText.textContent = String(hundredths).padStart(2, '0');
};

function start() {
    if (!running) {
        startStopImage.src = "images/stop.svg"
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);   // updates every 10 ms
        running = true;
    };
};

function stop() {
    if (running) {
        startStopImage.src = "images/start.svg"
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        running = false;
    };
};

function reset() {
    startStopImage.src = "images/start.svg"

    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;

    hoursText.textContent = '00';
    minutesText.textContent = '00';
    secondsText.textContent = '00';
    hundredthsText.textContent = '00';
};

function startStop() {
    if (running) {
        stop();
    } else {
        start();
    };
};

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset)