import Notiflix from "notiflix";

// Obtener referencia al formulario
const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
  event.preventDefault();

  // Obtener los valores de los campos del formulario
  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');
  const firstDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  // Validar los valores ingresados por el usuario
  if (isNaN(firstDelay) || isNaN(step) || isNaN(amount)) {
    displayErrorMessage('Invalid input. Please enter numeric values.');
    return;
  }

  // Crear las promesas
  for (let i = 1; i <= amount; i++) {
    const position = i;
    const delay = firstDelay + (i - 1) * step;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        displaySuccessMessage(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        displayErrorMessage(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

// Función para crear una promesa
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Funciones para mostrar notificaciones utilizando Notiflix
function displaySuccessMessage(message) {
  Notiflix.Notify.success(message);
}

function displayErrorMessage(message) {
  Notiflix.Notify.failure(message);
}
