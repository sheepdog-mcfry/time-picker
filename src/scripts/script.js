
document.addEventListener('DOMContentLoaded', function(event) {
  initClockListeners();
});

function initClockListeners() {
  var hour = document.querySelector('.hour-clock');
  hour.addEventListener('click', setHour, false);

  var minute = document.querySelector('.minute-clock');
  minute.addEventListener('click', setMinute, false);
}

function ensureTwoDigits(num) {
  return ('0' + num).slice(-2);
}

function setHour(e) {
  var clickedItem = e.target.id;
  document.getElementById('hoursInput').value = ensureTwoDigits(clickedItem);
}

function setMinute(e) {
  var clickedItem = e.target.id;
  document.getElementById('minutesInput').value = ensureTwoDigits(clickedItem);
}
