// FAQ Accordion
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    question.parentElement.classList.toggle("active");
  });
});

// Contact Form Handling
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form) {
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    clearErrors();
    formMessage.textContent = "";

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      service: form.service.value,
      message: form.message.value.trim(),
    };

    let hasError = false;

    if (!formData.name) {
      setError("name", "Full name is required");
      hasError = true;
    }

    if (!formData.email || !isValidEmail(formData.email)) {
      setError("email", "Please enter a valid email");
      hasError = true;
    }

    if (!formData.phone) {
      setError("phone", "Phone number is required");
      hasError = true;
    }

    if (!formData.service) {
      setError("service", "Please select a service");
      hasError = true;
    }

    if (!formData.message) {
      setError("message", "Please tell us about your project");
      hasError = true;
    }

    if (hasError) {
      showMessage("Please correct the errors below.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

   try {
  await fetch(
    "https://script.google.com/macros/s/AKfycbzmjx-cGXMfkbQChOoJwYwsVlc1nvaITc0F25a7UPAg20Pyzi1_MjPzhtsvnjpN8p16cw/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(formData),
    }
  );

  // If fetch didn't throw, treat as success
     setTimeout(()=>{
        showMessage(
    "Thank you! Your message has been sent successfully. We’ll contact you within 24 hours.",
    "success"
  );
     },1200);
 
  form.reset();

} catch (err) {
  console.error(err);
  showMessage("Something went wrong. Please try again.", "error");
}



    submitBtn.disabled = true;
    submitBtn.textContent = "Send Message";
  });
}

/*  HELPERS  */

function setError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorText = field.parentElement.querySelector(".error-text");
  field.classList.add("input-error");
  errorText.textContent = message;
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

  // Fade out after 5 seconds
  setTimeout(() => {
    formMessage.classList.remove("show");

    // Fully clear after fade
    setTimeout(() => {
      formMessage.textContent = "";
      formMessage.className = "form-message";
    }, 400);
  }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
