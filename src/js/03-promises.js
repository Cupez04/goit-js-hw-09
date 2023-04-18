const { Notify } = require("notiflix");

/** obtenemos los elementos del formulario por medio de los selectores */
const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');

/*se añade un escucha para evitar la recarga de la pagina
al dar submit en el fomrulario*/
form.addEventListener('submit', (event) => {
  event.preventDefault(); //metodo 

/** creacion de tres variables mediante number para
 * almacenar el valor en "numero" de los valores introducidos
 *en los inputs 
 */
  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  /* iteracion por medio de un bucle for para iterar el numero de promesas introducido */
  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;

/*manejo de la promesa luego de pasar el estado fulfilled o rejected,
* se hace manejo de la respuesta por medio de metodo then() y catch()
 */
    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

/**Escriba un script que llame a la función cuando se envíe el formulario createPromise(position, delay)
 *tantas veces como se haya introducido en el espacio amount
 *En cada vez que se llama, pasa el número del pagaré (posición)
 * y el retraso considerando el primer retardo (delay) y el paso (step) introducidos por el usuario.
 */
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3; // si el valor es > 0.3 se resuelve
      if (shouldResolve) {
        resolve({ position, delay }); 
      } else {
        reject({ position, delay }); // de lo contrario se rechaza
      }
    }, delay);
  });
}
