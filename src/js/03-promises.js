import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handlePromiseSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function handlePromiseError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  let delay = parseInt(formData.get('delay'));
  const step = parseInt(formData.get('step'));
  const amount = parseInt(formData.get('amount'));

  const promises = [];
  for (let i = 0; i < amount; i++) {
    promises.push(createPromise(i + 1, delay));
    delay += step;
  }

  promises.forEach(promise => {
    promise.then(handlePromiseSuccess).catch(handlePromiseError);
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);
