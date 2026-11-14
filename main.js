/*
  Email signup settings. Fill these in once you pick a provider.

  action:       the provider's form action URL (from its "embed form" HTML code).
  emailField:   the name the provider expects on the email input.
  hiddenFields: any extra hidden inputs the provider's embed code includes.

  While action is empty, the forms validate the address and then show a
  "not connected yet" message. Nothing is stored and no email is sent.
*/
var SIGNUP = {
  action: '',
  emailField: 'email',
  hiddenFields: {}
};

(function () {
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var connected = SIGNUP.action.trim() !== '';

  function showStatus(form, title, message) {
    var box = document.createElement('div');
    box.className = 'form-status';
    box.setAttribute('role', 'status');

    var heading = document.createElement('p');
    heading.className = 'form-status-title';
    heading.textContent = title;

    var body = document.createElement('p');
    body.textContent = message;

    box.appendChild(heading);
    box.appendChild(body);
    form.replaceWith(box);
  }

  function connect(form, input) {
    form.action = SIGNUP.action;
    form.method = 'post';
    input.name = SIGNUP.emailField;

    Object.keys(SIGNUP.hiddenFields).forEach(function (name) {
      var hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = name;
      hidden.value = SIGNUP.hiddenFields[name];
      form.appendChild(hidden);
    });
  }

  function wire(form) {
    if (!form) return;
    var input = form.querySelector('input[type=email]');
    var err = form.querySelector('.form-error');
    var hintId = input.getAttribute('aria-describedby');

    if (connected) connect(form, input);

    function setInvalid(invalid) {
      if (err) err.hidden = !invalid;
      if (invalid) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', err.id + ' ' + hintId);
      } else {
        input.removeAttribute('aria-invalid');
        input.setAttribute('aria-describedby', hintId);
      }
    }

    form.addEventListener('submit', function (e) {
      input.value = (input.value || '').trim();

      if (!EMAIL_RE.test(input.value)) {
        e.preventDefault();
        setInvalid(true);
        input.focus();
        return;
      }

      setInvalid(false);

      if (!connected) {
        e.preventDefault();
        showStatus(form, 'Not connected yet',
          'This form is a placeholder. Connect an email provider before going live.');
      }
    });

    input.addEventListener('input', function () {
      if (input.hasAttribute('aria-invalid')) setInvalid(false);
    });
  }

  wire(document.getElementById('form-hero'));
  wire(document.getElementById('form-foot'));
})();
