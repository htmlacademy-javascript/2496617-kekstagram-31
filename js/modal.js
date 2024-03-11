import { isEscKey } from "./util.js";
import { fillModal, showComments, matchShownCommentsNumber } from "./fill-modal.js";

const picturesContainerNode = document.querySelector('.pictures');
const modalNode = document.querySelector('.big-picture');
const closeBtnNode = modalNode.querySelector('.big-picture__cancel');
const showMoreCommentsBtn = modalNode.querySelector('.social__comments-loader');


//# обработчик открывает модальное окно при клике на контейнер с картинками
const onpicturesContainerNodeClick = (evt) => {
	const clickedPicture = evt.target.closest('.picture');

	fillModal(modalNode, clickedPicture); //? заполнение модалки внутри обработчика норм?
	
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

//# обработчик нажатия на кнопку показа больше комментариев
const onShowMoreCommentsBtnClick = function () {
	showComments();
	matchShownCommentsNumber(this);
}

//@ функция, открывающая модальное окно
const openModal = () => {
	modalNode.classList.remove('hidden');

	closeBtnNode.addEventListener('click', onCloseBtnNodeClick);
	document.addEventListener('keydown', onEscKeydown);

	document.body.classList.add('modal-open');

	showMoreCommentsBtn.addEventListener('click', onShowMoreCommentsBtnClick);
}

//@ функция, закрывающая модальное окно
const closeModal = () => {
	modalNode.classList.add('hidden');

	closeBtnNode.removeEventListener('click', onCloseBtnNodeClick);
	document.removeEventListener('keydown', onEscKeydown);

	document.body.classList.remove('modal-open');

	showMoreCommentsBtn.removeEventListener('click', onShowMoreCommentsBtnClick);
}

