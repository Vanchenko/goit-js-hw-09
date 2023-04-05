// task 1
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
btnStopEl.setAttribute('disabled', 'true');
let timerId = null;

btnStartEl.addEventListener('click', () => {
    btnStopEl.removeAttribute('disabled');
    btnStartEl.setAttribute('disabled', 'true');
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 500);
});
btnStopEl.addEventListener('click', () => {
    clearInterval(timerId);
    btnStartEl.removeAttribute('disabled');
    btnStopEl.setAttribute('disabled', 'true');
});