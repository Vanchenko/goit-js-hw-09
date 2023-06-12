import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  distance: '100px',
  opacity: 1,
});

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", GenProm);

function createPromise(pos, del) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
    if (shouldResolve) {
      resolve({ pos, del });
    } else {
      reject({ pos, del });
    }
    }, del );
  });
}

function GenProm(evt) {
  evt.preventDefault();
 // console.dir(evt.currentTarget.elements);
  const amount = Number(evt.currentTarget.elements.amount.value);
  const step = Number(evt.currentTarget.elements.step.value);
  let sumDelay = Number(evt.currentTarget.elements.delay.value);
  for (let i = 1; i <= amount; i += 1) {
      createPromise(i, sumDelay)
        .then(({ pos, del }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${pos} in ${del}ms`);
        })
        .catch(({ pos, del }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${pos} in ${del}ms`);
        })
    sumDelay = sumDelay + step;
    console.log(sumDelay, i);
  };
  evt.currentTarget.reset();
}

