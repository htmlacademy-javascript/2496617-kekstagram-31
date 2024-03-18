import { isEscKey } from "./util.js";

const uploadImgInputNode = document.querySelector('.img-upload__input');
const uploadOverlayNode = document.querySelector('.img-upload__overlay');
const closeButton = uploadOverlayNode.querySelector('.img-upload__cancel');

//@ функция, открывающая форму загрузки и обработки изображения
const openUploadOverlay = () => {
	uploadOverlayNode.classList.remove('hidden');

	closeButton.addEventListener('click', onCloseButtonClick);
	window.addEventListener('keydown', onWindowKeydown);

	document.body.classList.add('modal-open');
};

//@ функция, закрывающая форму загрузки и обработки изображения
const closeUploadOverlay = () => {
	uploadOverlayNode.classList.add('hidden');
	
	closeButton.removeEventListener('click', onCloseButtonClick);
	window.removeEventListener('keydown', onWindowKeydown);

	document.body.classList.remove('modal-open');
};

//# обработчик нажатия на крестик
const onCloseButtonClick = () => {
	closeUploadOverlay();
};

//# обработчик нажатия на кнопку ESC
const onWindowKeydown = (evt) => {
	if (isEscKey(evt)) {
		closeUploadOverlay();
	}
};


uploadImgInputNode.addEventListener('change', () => {
	openUploadOverlay();
});


