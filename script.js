document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const yearLabel = document.getElementById("currentYear");

  if (yearLabel) {
    yearLabel.textContent = new Date().getFullYear();
  }

  const toggleNavbarBackground = () => {
    if (window.scrollY > 80) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  };

  toggleNavbarBackground();
  window.addEventListener("scroll", toggleNavbarBackground);
});
