//# сообщение об успешной отправке
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const closeSuccessMessageButton = successMessageElement.querySelector('.success__button');

//# обработчик нажатия на кнопку закрытия сообщения об успешной отправке
const onCloseSuccessMessageButtonClick = () => {
	successMessageElement.remove();
};

closeSuccessMessageButton.addEventListener('click', onCloseSuccessMessageButtonClick);

//# сообщение об ошибке отправки
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const closeErrorMessageButton = errorMessageElement.querySelector('.error__button');

//# обработчик нажатия на кнопку закрытия сообщения об ошибке отправки
const onCloseErrorMessageButtonClick = () => {
	errorMessageElement.remove();
};
closeErrorMessageButton.addEventListener('click', onCloseErrorMessageButtonClick);
/// обработчики можно не удалять (как я понял), так как удаляются элементы

//# обработчик нажатия на документ за пределами блока с сообщением
const onAlertMessageClick = (evt) => {
	if (evt.target.classList.contains('success')) {
		successMessageElement.remove();
		document.removeEventListener('click', onAlertMessageClick);
	}
	if (evt.target.classList.contains('error')) {
		errorMessageElement.remove();
		document.removeEventListener('click', onAlertMessageClick);
	}
};
document.addEventListener('click', onAlertMessageClick);

// &------------------------ EXPORT ------------------------& //
export {successMessageElement, errorMessageElement, }