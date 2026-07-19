// ============================================================
// Excelerate Internship 2026 — Portfolio
// Console clock, scroll-reveal, and email copy interaction
// ============================================================

(function () {
  "use strict";

  /* ---- Live clock (Adama, Ethiopia / East Africa Time) ---- */
  var clockEl = document.getElementById("clock");

  function updateClock() {
    if (!clockEl) return;
    var now = new Date();
    var formatted;
    try {
      formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Addis_Ababa",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).format(now);
    } catch (e) {
      // Fallback: EAT is UTC+3, no daylight saving
      var utc = now.getTime() + now.getTimezoneOffset() * 60000;
      var eat = new Date(utc + 3 * 3600000);
      formatted = [eat.getHours(), eat.getMinutes(), eat.getSeconds()]
        .map(function (n) { return String(n).padStart(2, "0"); })
        .join(":");
    }
    clockEl.textContent = formatted;
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Copy email to clipboard ---- */
  var emailRow = document.getElementById("email-row");
  var copyNote = document.getElementById("copy-note");

  if (emailRow && copyNote) {
    emailRow.addEventListener("click", function (e) {
      if (!navigator.clipboard) return; // let mailto: proceed normally
      e.preventDefault();
      navigator.clipboard
        .writeText("bilalabdulkadir286@gmail.com")
        .then(function () {
          copyNote.textContent = "Email address copied to clipboard.";
          setTimeout(function () { copyNote.textContent = ""; }, 2500);
        })
        .catch(function () {
          window.location.href = emailRow.href;
        });
    });
  }
})();