import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

require('flatpickr/dist/themes/material_blue.css');

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerFields = document.querySelectorAll('.timer .value');
const timerContainer = document.querySelector('.timer');

// STYLES
timerContainer.style.display = 'flex';
timerContainer.style.fontSize = '18px';

timerFields.forEach(field => {
  field.style.fontSize = '24px';
  field.style.paddingLeft = '5px';
});
// STYLES

let countdownInterval;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  static: true,

  onClose(selectedDates) {
    const [selectedDate] = selectedDates;

    if (selectedDate && selectedDate > new Date()) {
      startButton.removeAttribute('disabled');
    } else {
      startButton.setAttribute('disabled', 'disabled');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

Notiflix.Notify.init({
  width: '350px',
  position: 'center-top',
  distance: '10px',
  fontSize: '18px',
});

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(targetDate) {
  clearInterval(countdownInterval);

  function updateDisplay() {
    const currentDate = new Date();
    let timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      timeDifference = 0;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    timerFields[0].textContent = addLeadingZero(days);
    timerFields[1].textContent = addLeadingZero(hours);
    timerFields[2].textContent = addLeadingZero(minutes);
    timerFields[3].textContent = addLeadingZero(seconds);

    if (timeDifference === 0) {
      startButton.setAttribute('disabled', 'disabled');
    }
  }

  updateDisplay();
  countdownInterval = setInterval(updateDisplay, 1000);
}

startButton.addEventListener('click', function () {
  if (selectedDate) {
    updateTimer(selectedDate);
  }
});

dateTimePicker.addEventListener('change', function () {
  selectedDate = new Date(dateTimePicker.value);
});
