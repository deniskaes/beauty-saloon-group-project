const log = console.log

const contactForm = document.querySelector("#contactForm");
const contactButton = document.querySelector('#contactButton');

(function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#' + burger.dataset.target);
  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
})();

contactForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const nameInput = document.querySelector('#nameInput');
  const emailInput = document.querySelector('#emailInput');
  const telInput = document.querySelector('#telInput')
  const messageFromUser = document.querySelector('#messageFromUser')

  log("event.target", event.target)
  let parent = event.target.closest('div')
  log("parent", parent)
  log('contactButton, telInput, nameInput, messageFromUser, emailInput ----------------->', contactButton, nameInput.value, emailInput.value, telInput.value, messageFromUser.value)
})
{/* <form id="contactForm" class="field" action="">
            <label class="label">Имя</label>
            <input id="nameInput" name="fullName" class="input is-medium" type="text" placeholder="Ivan Ivanov">
            <label class="label">Email</label>
            <input id="emailInput" name="email" class="input is-medium" type="email" placeholder="youremail@ya.ru">
            <label class="label">Номер телефона</label>
            <input id="telInput" name="tel" class="input is-medium" type="tel" placeholder="+7(911) 777-77-77">
            <label class="label">Сообщение</label>
            <textarea id="messageFromUser" name="messageFromUser" id="textInput" class="textarea is-medium" placeholder="Ваше сообщение"
              value=" "></textarea>
            <button id="contactButton" type="submit"
              class="button is-link is-fullwidth has-text-weight-medium is-medium">Send
              Message</button> */}
