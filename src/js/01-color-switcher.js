function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
  /*Obtenermos referencia el elemento body por medio
del cual haremos los cambios de color en toda la pagina
*/
  const body = document.querySelector('body');
  /* referencia a los botones con el atributo data-* para almacenar la info */
  const buttonStart = document.querySelector('button[data-start]');
  const buttonStop = document.querySelector('button[data-stop]');

  /* valor null como estado inicial al no haber iniciado eventos */
  let changeColor = null;
  /*  Asegúrese de que el botón «Start» esté desactivado mientras se ejecute el cambio de tema.*/
  buttonStop.disabled = true;

  /* aplicamos addEventListeners */
  buttonStart.addEventListener('click', buttonActived);
  buttonStop.addEventListener('click', buttonDesactived);
  
  /* hacemos llamada a las funciones*/
  function buttonActived () {
    changeColor = setInterval(()=> {
      body.style.backgroundColor = getRandomHexColor();
      buttonStart.disabled = true;
      buttonStop.disabled = false;
      buttonStart.style.color = 'white';
    }, 1000);
  }
  /* añadimos la funcion para detener y limpiar la funcion changeColor */
  function buttonDesactived () {
    clearInterval(changeColor);
    buttonStart.disabled = false;
    buttonStop.disabled = true;
    buttonStop.style.color = 'white';
  }
  

