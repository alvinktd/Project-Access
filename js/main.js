/* =========================================================
   Room4Us scripts
   1. Hamburger menu on narrow screens
   2. Modals that open from cards and buttons
   3. Flip cards on the home page
   No libraries needed.
   ========================================================= */

"use strict";

/* ---------- 1. Hamburger menu ---------- */

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

if (menuButton && nav) {
  // Open or close the menu when the hamburger is pressed
  menuButton.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
  });

  // Escape closes the menu and puts focus back on the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      menuButton.focus();
    }
  });

  // Tapping anywhere outside the menu closes it
  document.addEventListener("click", (event) => {
    const clickedInside = nav.contains(event.target) || menuButton.contains(event.target);
    if (!clickedInside && nav.classList.contains("is-open")) {
      setMenu(false);
    }
  });
}


/* ---------- 2. Modals ----------
   A button with class "open-modal" opens the dialog whose id
   is in its aria-controls attribute.
   Example: <button class="open-modal" aria-controls="cohort"> */

document.querySelectorAll(".open-modal").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(button.getAttribute("aria-controls"));
    if (dialog) {
      dialog.showModal();
      // Start at the top of a long modal, with focus on its close button
      dialog.scrollTop = 0;
      const close = dialog.querySelector(".dialog-close");
      if (close) {
        close.focus();
      }
      // When it closes, put focus back on the card or button that opened it
      dialog.addEventListener("close", () => button.focus(), { once: true });
    }
  });
});

// Every "Close" button closes its own dialog.
// Escape closes a dialog too. The browser does that for us.
document.querySelectorAll(".dialog-close").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

// Tapping the dark area outside a dialog closes it
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) {
      return;
    }
    const box = dialog.getBoundingClientRect();
    const inside =
      event.clientX >= box.left &&
      event.clientX <= box.right &&
      event.clientY >= box.top &&
      event.clientY <= box.bottom;
    if (!inside) {
      dialog.close();
    }
  });
});



/* ---------- 3. Flip cards ----------
   A button with class "flip" turns over when pressed.
   aria-pressed tells screen readers which side is showing. */

document.querySelectorAll(".flip").forEach((card) => {
  card.addEventListener("click", () => {
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
  });
});
