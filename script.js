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

const debouce = function (func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const animacao = document.querySelectorAll("[data-anime]");
const animacaoClasse = "animate";

function animacaoScroll() {
  const windowTop = window.pageYOffset + window.innerHeight * 0.75;
  animacao.forEach(function (elemento) {
    if (windowTop > elemento.offsetTop) {
      elemento.classList.add(animacaoClasse);
    } else {
      elemento.classList.remove(animacaoClasse);
    }
    console.log(elemento.offsetTop);
  });
}

animacaoScroll();

if (animacao.length) {
  window.addEventListener(
    "scroll",
    debouce(function () {
      animacaoScroll();
    }, 100)
  );
}

class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".header-acesso",
  ".header-acesso li"
);
mobileNavbar.init();
