import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date(selectedDate);

    if (selectedDate <= currentDate) {
      Notiflix.Notify.warning("Please choose a date in the future");
      return;
    }

    const startButton = document.querySelector('[data-start]');
    
  },
};

flatpickr("#datetime-picker", options);

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

let countdownInterval;

function startTimer() {
  const selectedDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value);
  const currentDate = new Date(flatpickr.parseDate);
  const remainingTime = selectedDate.getTime() - currentDate.getTime();


  countdownInterval = setInterval(() => {
    const timeLeft = selectedDate.getTime() - new Date().getTime();

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success("Countdown completed");
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

const startButton = document.querySelector('[data-start]');
startButton.addEventListener('click', startTimer);