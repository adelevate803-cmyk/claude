/* Nexus Holidays — contact form handling
 *
 * SETUP REQUIRED: this form needs a form-backend endpoint to actually
 * deliver messages to your inbox (this is a static site with no server).
 * The quickest option is Formspree (free): create a form at
 * https://formspree.io, then paste your endpoint below.
 * Any endpoint that accepts a POST of FormData and returns JSON works
 * the same way (Formspree, Getform, Basin, etc).
 */
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
const NOTIFY_EMAIL = 'hello@nexusholidays.com';

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('.form-submit');
  const submitLabel = submitBtn.querySelector('.btn-label');

  const required = ['fullName', 'email', 'message'];

  function clearErrors() {
    form.querySelectorAll('.form-field.error').forEach((f) => f.classList.remove('error'));
    form.querySelectorAll('.field-error').forEach((el) => el.remove());
  }

  function showFieldError(field, message) {
    const wrap = field.closest('.form-field');
    wrap.classList.add('error');
    const msg = document.createElement('div');
    msg.className = 'field-error';
    msg.textContent = message;
    wrap.appendChild(msg);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    clearErrors();
    let valid = true;

    required.forEach((name) => {
      const field = form.elements[name];
      if (!field.value.trim()) {
        showFieldError(field, 'This field is required.');
        valid = false;
      }
    });

    const emailField = form.elements.email;
    if (emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
      showFieldError(emailField, 'Enter a valid email address.');
      valid = false;
    }

    return valid;
  }

  function setStatus(message, type) {
    status.textContent = message;
    status.className = 'form-status' + (type ? ' ' + type : '');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('', '');

    if (!validate()) {
      setStatus('Please fix the highlighted fields.', 'error');
      return;
    }

    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
      // Endpoint not configured yet — fall back to opening the user's
      // email client pre-filled with everything they entered, so the
      // form still "sends" something usable end to end.
      const data = new FormData(form);
      const lines = [
        `Name: ${data.get('fullName')}`,
        `Email: ${data.get('email')}`,
        `Phone: ${data.get('phone') || '-'}`,
        `Destination: ${data.get('destination') || '-'}`,
        `Travel dates: ${data.get('travelDates') || '-'}`,
        `Travellers: ${data.get('travellers') || '-'}`,
        '',
        data.get('message'),
      ];
      const subject = encodeURIComponent(`Trip enquiry from ${data.get('fullName')}`);
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = `mailto:${NOTIFY_EMAIL}?subject=${subject}&body=${body}`;
      setStatus('Opening your email client to send this to us directly.', 'success');
      return;
    }

    submitBtn.disabled = true;
    submitLabel.textContent = 'Sending…';

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();
        setStatus("Thank you — your message is on its way. We'll be in touch within one business day.", 'success');
      } else {
        setStatus('Something went wrong sending your message. Please email us directly instead.', 'error');
      }
    } catch (err) {
      setStatus('Network error — please email us directly instead.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = 'Send Message';
    }
  });
})();
