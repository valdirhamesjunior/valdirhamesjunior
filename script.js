const titulo = document.querySelector(".topo-titulo p");

function textoEscrever(elemento) {
  const textoArray = elemento.innerText.split("");
  elemento.innerHTML = "";

  textoArray.forEach((letra, index) => {
    setTimeout(function () {
      elemento.innerHTML += letra;
    }, 75 * index);
  });
}

textoEscrever(titulo);
setInterval(() => {
  textoEscrever(titulo);
}, 10000);
