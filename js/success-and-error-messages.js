//@ функция, создающая сообщение об успешной отправке или ошибке
const createMessage = (name) => {
	const messageTemplate = document.querySelector(`#${name}`).content.querySelector(`.${name}`);
	const messageElement = messageTemplate.cloneNode(true);
	const closeMessageButton = messageElement.querySelector('button');

	const onCloseMessageButtonClick = () => {
		messageElement.remove();
	};

	closeMessageButton.addEventListener('click', onCloseMessageButtonClick);

	messageElement.addEventListener('click', onOverlayMessageClick);

	return messageElement;
};

//# обработчик нажатия на оверлэй сообщения за пределами блока с сообщением
const onOverlayMessageClick = (evt) => {
	if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
		successMessageElement.remove();
		errorMessageElement.remove();
	}
};

const successMessageElement = createMessage('success');
const errorMessageElement = createMessage('error');

/// обработчики можно не удалять (как я понял), так как удаляются элементы вместе с обработчиками

// &------------------------ EXPORT ------------------------& //
export { createMessage };