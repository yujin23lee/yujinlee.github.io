let hr = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');

function displayTime(){
  let date = new Date();

  // Getting hour, mins, secs from date
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  let hRotation = 30*hh + mm/2;
  let mRotation = 6*mm;
  let sRotation = 6*ss;

  hr.style.transform = `rotate(${hRotation}deg)`;
  min.style.transform = `rotate(${mRotation}deg)`;
  sec.style.transform = `rotate(${sRotation}deg)`;
}
setInterval(displayTime, 1000);

function dropNumber(element) {
   // Remove the 'dropping' class first if already present to allow replay
  if (element.classList.contains('dropping')) {
    element.classList.remove('dropping');
    void element.offsetWidth; // Trigger reflow to restart animation
  }
   element.classList.add('dropping');

  setTimeout(() => {
    element.style.display = 'none';
  }, 1000); // Match animation duration
}
document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");
  setTimeout( () => {
    splashScreen.style.display = "none";
    mainContent.style.display = "block";
  }, 5000);
});