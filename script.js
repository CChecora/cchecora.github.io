<!-- document.getElementById("year").textContent = new Date().getFullYear(); -->

 <!-- Accordion deep-link handler -->
  window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const target = document.getElementById(hash);
    if (target && target.tagName.toLowerCase() === "details") {
      target.open = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
