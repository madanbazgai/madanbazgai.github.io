const burger = document.querySelector(".burger");
const links = document.querySelector("ul");
const nav = document.querySelector("nav");

burger.addEventListener("click", () => {
  links.classList.toggle("active");
  nav.classList.toggle("active");
});
