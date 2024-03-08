import { isEscKey } from "./util.js";
import { fillModal } from "./fill-modal.js";

const picturesContainerNode = document.querySelector('.pictures');
const modalNode = document.querySelector('.big-picture');
const closeBtnNode = modalNode.querySelector('.big-picture__cancel');

const commentsCountNode = modalNode.querySelector('.social__comment-count');
const commentsLoaderNode = modalNode.querySelector('.comments-loader');


//# обработчик открывает модальное окно при клике на контейнер с картинками
const onpicturesContainerNodeClick = (evt) => {
	const clickedPicture = evt.target.closest('.picture');

	fillModal(modalNode, clickedPicture); //! заполнение модалки внутри обработчика норм?
	
	openModal();
}

picturesContainerNode.addEventListener('click', onpicturesContainerNodeClick);


//# обработчик закрывает модальное окно при клике на крестик
const onCloseBtnNodeClick = () => {
	closeModal();
}

//# обработчик закрывает модальное окно при нажатии на ESC
const onEscKeydown = (evt) => {
	if (isEscKey(evt)) {
		closeModal();
	}
}

//@ функция, открывающая модальное окно
const openModal = () => {
	modalNode.classList.remove('hidden');

	closeBtnNode.addEventListener('click', onCloseBtnNodeClick);
	document.addEventListener('keydown', onEscKeydown);

	commentsCountNode.classList.add('hidden');
	commentsLoaderNode.classList.add('hidden');

	document.body.classList.add('modal-open');
}

//@ функция, закрывающая модальное окно
const closeModal = () => {
	modalNode.classList.add('hidden');

	closeBtnNode.removeEventListener('click', onCloseBtnNodeClick);
	document.removeEventListener('keydown', onEscKeydown);

	document.body.classList.remove('modal-open');
}

