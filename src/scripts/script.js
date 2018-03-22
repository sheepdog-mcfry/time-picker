
document.addEventListener('DOMContentLoaded', function(event) {
  initClockListeners();
});

function initClockListeners() {
  var clock = document.querySelector('.clock');
  clock.addEventListener('click', setTime, false);
}

function ensureTwoDigits(num) {
  return ('0' + num).slice(-2);
}

function setTime(e) {
    var clickedItem = e.target.id;
    document.getElementById('hoursInput').value = ensureTwoDigits(clickedItem);
}
