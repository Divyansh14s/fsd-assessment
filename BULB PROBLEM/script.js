/** @format */

const startButton = document.querySelector("#start");
const container = document.querySelector(".container");
const bulbContainer = document.querySelector(".bulb-container");
const input = document.querySelector("input");
const submit = document.querySelector("#submit");
const reset = document.querySelector("#reset");
reset.style.display = "none";

let bulbCount = 0;

startButton.addEventListener("click", () => {
  container.style.display = "flex";
  startButton.style.display = "none";
});

submit.addEventListener("click", () => {
  reset.style.display = "block";
  bulbCount = parseInt(input.value); // Ensure bulbCount is a number
  container.style.display = "none";
  bulbContainer.style.display = "flex";
  bulbContainer.innerHTML = ""; // Clear previous bulbs

  for (let i = 0; i < bulbCount; i++) {
    const bulbSwitchContainer = document.createElement("div");
    bulbSwitchContainer.classList.add("bulb-switch-combo");

    const bulb = document.createElement("img");
    const switchButton = document.createElement("button");
    const timer = document.createElement("div");

    switchButton.innerText = "OFF";
    switchButton.style.background = "red";

    bulb.id = `bulb${i}`;
    bulb.src = "bulb.jpg";
    bulb.style.filter = "grayscale(100%)";
    bulb.width = 100;
    bulb.height = 150;

    timer.id = `timer${i}`;
    timer.style.textAlign = "center";
    timer.style.marginTop = "10px";
    timer.innerText = "10 seconds";

    bulbSwitchContainer.appendChild(bulb);
    bulbSwitchContainer.appendChild(switchButton);
    bulbSwitchContainer.appendChild(timer);

    let intervalId = null;
    let timeLeft = 10;

    switchButton.addEventListener("click", () => {
      if (bulb.style.filter === "grayscale(100%)") {
        bulb.style.filter = "grayscale(0%)";
        switchButton.innerText = "ON";
        switchButton.style.background = "limegreen";
        timeLeft = 10; // Reset timer
        timer.innerText = `${timeLeft} seconds`;

        if (intervalId) clearInterval(intervalId); // Clear any previous interval
        intervalId = setInterval(() => {
          timeLeft--;
          if (timeLeft <= 0) {
            clearInterval(intervalId);
            bulb.style.filter = "grayscale(100%)";
            switchButton.innerText = "OFF";
            switchButton.style.background = "red";
          }
          timer.innerText = `${timeLeft} seconds`;
        }, 1000);
      } else {
        bulb.style.filter = "grayscale(100%)";
        switchButton.innerText = "OFF";
        switchButton.style.background = "red";
        clearInterval(intervalId);
        timer.innerText = "10 seconds";
      }
    });

    bulbContainer.appendChild(bulbSwitchContainer);
  }
});

reset.addEventListener("click", () => {
  input.value = "";
  bulbContainer.style.display = "none";
  startButton.style.display = "block";
  reset.style.display = "none";
  bulbContainer.innerHTML = ""; // Clear all bulbs and timers
});