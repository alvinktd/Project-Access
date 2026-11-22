/* =========================================================
   Project Access scripts
   1. Hamburger menu on narrow screens
   2. Modals that open from cards and buttons
   No libraries needed.
   ========================================================= */

/* ---------- 1. Hamburger menu ---------- */
var menuButton = document.querySelector(".menu-button");
var nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  // Open or close the menu when the hamburger is pressed
  menuButton.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Escape closes the menu and puts focus back on the button
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.focus();
    }
  });
}

/* ---------- 2. Modals ----------
   Any button with class "open-modal" opens the dialog
   whose id is in its aria-controls attribute.
   Example: <button class="open-modal" aria-controls="cohort-details"> */
var openButtons = document.querySelectorAll(".open-modal");

openButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var dialog = document.getElementById(button.getAttribute("aria-controls"));
    if (dialog) {
      dialog.showModal();
    }
  });
});

// Every "Close" button closes its own dialog.
// Escape closes a dialog too. The browser does that for us.
document.querySelectorAll(".dialog-close").forEach(function (button) {
  button.addEventListener("click", function () {
    button.closest("dialog").close();
  });
});

// Tapping the dark area outside a dialog closes it
document.querySelectorAll("dialog").forEach(function (dialog) {
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      var box = dialog.getBoundingClientRect();
      var inside =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom;
      if (!inside) {
        dialog.close();
      }
    }
  });
});
