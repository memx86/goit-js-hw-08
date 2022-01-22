import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form [name="email"]'),
  message: document.querySelector('.feedback-form [name="message"]'),
};
const STORAGE_FEEDBACK_FORM_STATE = 'feedback-form-state';
const throttledOnFeedbackFormInput = throttle(onFeedbackFormInput, 500);
let formState = {};

if (localStorage[STORAGE_FEEDBACK_FORM_STATE]) {
  try {
    formState = JSON.parse(localStorage[STORAGE_FEEDBACK_FORM_STATE]);
  } catch {
    formState.email = '';
    formState.message = '';
  }
  refs.email.value = formState.email ? formState.email : '';

  refs.message.value = formState.message ? formState.message : '';
}

refs.form.addEventListener('input', throttledOnFeedbackFormInput);
refs.form.addEventListener('submit', onFeedbackFormSubmit);

function onFeedbackFormInput(e) {
  formState[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_FEEDBACK_FORM_STATE, JSON.stringify(formState));
}
function onFeedbackFormSubmit(e) {
  e.preventDefault();
  const feedbackFormData = {
    email: e.target.email.value,
    message: e.target.message.value,
  };
  console.log(feedbackFormData);
  localStorage.removeItem(STORAGE_FEEDBACK_FORM_STATE);
  e.target.reset();
}
