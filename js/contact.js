document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    question.parentElement.classList.toggle("active");
  });
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbw3jNhY76oaQVt_7KcPeCh3F4kMS-eESxRGi9v8aerUHVTBmeF9oFm7vUd2gWHjo-yyaw/exec";

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

/* ---------- HELPER FUNCTIONS ---------- */

function setError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorText = field.parentElement.querySelector(".error-text");

  field.classList.add("input-error");
  if (errorText) errorText.textContent = message;
}

function clearErrors() {
  document
    .querySelectorAll(".error-text")
    .forEach((el) => (el.textContent = ""));

  document
    .querySelectorAll(".input-error")
    .forEach((el) => el.classList.remove("input-error"));
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type} show`;

  setTimeout(() => {
    formMessage.classList.remove("show");

    setTimeout(() => {
      formMessage.textContent = "";
      formMessage.className = "form-message";
    }, 400);
  }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------- FORM SUBMISSION ---------- */

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearErrors();

  const formData = new FormData(form);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const phone = formData.get("phone").trim();
  const service = formData.get("service");
  const message = formData.get("message").trim();

  let isValid = true;

  // VALIDATION

  if (!name) {
    setError("name", "Please enter your name");
    isValid = false;
  }

  if (!email || !isValidEmail(email)) {
    setError("email", "Please enter a valid email");
    isValid = false;
  }

  if (!phone) {
    setError("phone", "Please enter your phone number");
    isValid = false;
  }

  if (!message) {
    setError("message", "Please enter your message");
    isValid = false;
  }

  if (!isValid) return;

  showMessage("Sending message...", "info");

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone,
        service,
        message,
      }),
    });

    const result = await res.json();

    if (result.status === "success") {
      showMessage("Message sent successfully!", "success");
      form.reset();
    } else {
      showMessage("Something went wrong. Please try again.", "error");
    }
  } catch (error) {
    showMessage("Network error. Please try again.", "error");
  }
});
