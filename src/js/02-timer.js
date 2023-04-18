/* importamos las librerias y los estilos */
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.querySelector('#datetime-picker');
const btnStartCount = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const body = document.querySelector('body');

let getDateTime = new Date();
let differencesDates = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        getDateTime = selectedDates[0].getTime();
        if (getDateTime < new Date().getTime()) {
            Notify.failure('\u{1F97A} please choose a date in the future')
            disabledButton();
        } else {
            btnStartCount.removeAttribute('disabled')
        }
    },
};

flatpickr(dateTimePicker, options);

const disabledButton = () => {
  btnStartCount.setAttribute('disabled', true);
};

const addLeadingZero = value => {
  if (value < 10) {
    return `${value}`.padStart(2, '0');
  }
  return `${value}`;
};

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

const countDownTimer = () => {
  disabledButton();
  const currentDate = new Date().getTime();
  differencesDates = getDateTime - currentDate;
  if (getDateTime <= currentDate) {
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(differencesDates);
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);

  setTimeout(() => {
    countDownTimer();
  }, 1000);
};

btnStartCount.addEventListener('click', countDownTimer);

//estilos
document.body.style.backgroundColor = "#C5D5CB";
document.body.style.transition = "background-color 0.5s ease-in-out";
