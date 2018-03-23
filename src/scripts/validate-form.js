function validateForm() {
  var hoursInput, minutesInput, ampm, text;

  hoursInput = document.getElementById('hoursInput').value;
  minutesInput = document.getElementById('minutesInput').value;
  ampm = document.querySelector('input[name="time-of-day"]:checked').value;

  if (isNaN(hoursInput) || hoursInput < 0 || hoursInput > 12 ) {
    text = "Hours not valid";
    alert(text);
    return false
  } else if (isNaN(minutesInput) || minutesInput < 0 || minutesInput > 60 ) {
    text = "Minutes not valid";
    alert(text);
    return false
  }
}
