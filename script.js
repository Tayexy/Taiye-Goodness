const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const serviceSelect = document.querySelector('#service');
    if (serviceSelect) {
      const requested = link.dataset.service;
      const matchingOption = Array.from(serviceSelect.options).find((option) => option.text === requested);
      if (matchingOption) serviceSelect.value = matchingOption.value;
    }
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("project-form");
  const button = document.getElementById("submit-button");
  const buttonText = document.getElementById("button-text");
  const feedback = document.getElementById("form-feedback");

  if (!form || !button || !feedback) return;

  // Your EmailJS credentials
  const EMAILJS_PUBLIC_KEY = "nDqVLSrtj1-SOburh";
  const EMAILJS_SERVICE_ID = "service_u6v58d7";
  const EMAILJS_TEMPLATE_ID = "template_h5k2ov5";

  // Initialize EmailJS
  if (typeof emailjs === "undefined") {
    feedback.textContent =
      "The email service could not load. Please refresh and try again.";
    feedback.className = "form-feedback error";
    console.error("EmailJS library was not loaded.");
    return;
  }

  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Use browser validation for required fields and email format.
    if (!form.reportValidity()) return;

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const service = form.elements["service"].value;
    const budget =
      form.elements["budget"].value || "Not specified";
    const details = form.elements["details"].value.trim();

    if (!name || !email || !service || !details) {
      feedback.textContent =
        "Please complete all required fields.";
      feedback.className = "form-feedback error";
      return;
    }

    button.disabled = true;
    buttonText.textContent = "Sending...";
    feedback.textContent = "Sending your enquiry. Please wait.";
    feedback.className = "form-feedback";

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: name,
          email: email,
          service: service,
          budget: budget,
          details: details
        }
      );

      console.log("EmailJS success:", response.status, response.text);

      feedback.textContent =
        "Thank you, " + name +
        "! Your enquiry was sent successfully. I'll be in touch.";

      feedback.className = "form-feedback success";
      form.reset();

    } catch (error) {
      console.error("EmailJS error:", error);

      feedback.textContent =
        "Sorry, your enquiry could not be sent. Please try again or contact me directly.";

      feedback.className = "form-feedback error";

    } finally {
      button.disabled = false;
      buttonText.textContent = "Send my enquiry";
    }
  });
});
