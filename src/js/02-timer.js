import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
    width: '280px',
    position: 'center-top',
    distance: '100px',
    opacity: 1,
});
let dt = new Date().getTime();
const currentTime = Date.now();
console.log(currentTime);
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > options.defaultDate) {
            btnDate.removeAttribute('disabled');
            dt = selectedDates[0].getTime() - options.defaultDate.getTime();
        } else {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
    },
};

const divTimerEl = document.querySelector('.timer');
const divFieldEl = document.querySelectorAll('.field');
const spValuedEl = document.querySelectorAll('.value');
const btnDate = document.querySelector('button[data-start]');
const inputEl = document.querySelector("#datetime-picker");
const spValDsEl = document.querySelector('span[data-days]')
btnDate.setAttribute('disabled', 'true');
let timerId = null;


divTimerEl.style.display = "flex";
divTimerEl.style.gap = "10px";
divTimerEl.style.marginTop = "20px";
console.log(divFieldEl);

/*divFieldEl[0].style.display = "flex";
divFieldEl[0].style.flexDirection = "column";
divFieldEl[1].style.display = "flex";
divFieldEl[1].style.flexDirection = "column";
divFieldEl[2].style.display = "flex";
divFieldEl[2].style.flexDirection = "column";
divFieldEl[3].style.display = "flex";
divFieldEl[3].style.flexDirection = "column";*/
//divFieldEl.style.alignItems = "center";
divFieldEl.forEach((item) => {
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.alignItems = "center";
});
spValuedEl.forEach((item) => {
    item.style.fontSize = "52px";
});

//console.dir(spValDsEl);
//console.dir(spValuedEl);

const fp = flatpickr(inputEl, options );

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

btnDate.addEventListener('click', () => {
    btnDate.setAttribute('disabled', 'true');
    inputEl.setAttribute('disabled', 'true');
    timerId = setInterval(() => {
        dt = dt - 1000;
        const { days, hours, minutes, seconds } = convertMs(dt);
        spValuedEl[0].textContent = addLeadingZero(days);
        spValuedEl[1].textContent = addLeadingZero(hours);
        spValuedEl[2].textContent = addLeadingZero(minutes);
        spValuedEl[3].textContent = addLeadingZero(seconds);
        if (dt < 1000) {
            clearInterval(timerId);
            btnDate.removeAttribute('disabled');
            inputEl.setAttribute('disabled');
        };
    }, 1000);
 });


