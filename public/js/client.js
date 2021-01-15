const log = console.log

const contactForm = document.querySelector("#contactForm");
const contactButton = document.querySelector('#contactButton');
const container = contactForm.closest('div');

(function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#' + burger.dataset.target);
  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
})();

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const nameInput = document.querySelector('#nameInput');
  const emailInput = document.querySelector('#emailInput');
  const telInput = document.querySelector('#telInput')
  const messageFromUser = document.querySelector('#messageFromUser')

  const response = await fetch("/client_message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fullName: nameInput.value,
      email: emailInput.value,
      tel: telInput.value,
      messageFromUser: messageFromUser.value,
    }),
  });

  const successMessage = document.createElement('div');
  successMessage.classList.add('field');
  successMessage.innerText = "Спасибо, форма отправлена!";
  nameInput.value = "";
  emailInput.value = "";
  telInput.value = "";
  messageFromUser.value = "";

  container.append(successMessage);

	setTimeout(() => {
		successMessage.remove();
	}, 3000);
})

