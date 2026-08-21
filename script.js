const header = document.querySelector('.site-header');

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0);
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

const accordionItems = [...document.querySelectorAll('.accordion details')];
accordionItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    accordionItems.forEach((other) => { if (other !== item) other.open = false; });
  });
});

const form = document.querySelector('#signup-form');
const formStatus = form?.querySelector('.form-status');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = '';
  if (!form.checkValidity()) {
    form.reportValidity();
    formStatus.textContent = 'Пожалуйста, заполните обязательные поля.';
    return;
  }
  if (!form.querySelector('input[name="subject"]:checked')) {
    formStatus.textContent = 'Выберите хотя бы один предмет.';
    form.querySelector('input[name="subject"]')?.focus();
    return;
  }
  formStatus.textContent = 'Спасибо! Заявка готова к отправке. Здесь можно подключить API.';
  form.reset();
});
