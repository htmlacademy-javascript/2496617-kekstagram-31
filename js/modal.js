import { isEscKey } from './util.js';
import { fillModal, showComments, matchShownCommentsNumber } from './fill-modal.js';

const picturesContainerElement = document.querySelector('.pictures');
const modalElement = document.querySelector('.big-picture');
const closeButtonElement = modalElement.querySelector('.big-picture__cancel');
const showMoreCommentsButton = modalElement.querySelector('.social__comments-loader');


//# обработчик открывает модальное окно при клике на контейнер с картинками
const onPicturesContainerElementClick = (evt) => {
  const clickedPicture = evt.target.closest('.picture');

  if (clickedPicture) {
    fillModal(clickedPicture, modalElement, showMoreCommentsButton);
    openModal();
  }
};

picturesContainerElement.addEventListener('click', onPicturesContainerElementClick);

//# обработчик закрывает модальное окно при нажатии на ESC
const onEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    closeModal();
  }
};

//# обработчик нажатия на кнопку показа больше комментариев
const onShowMoreCommentsButtonClick = function () {
  showComments();
  matchShownCommentsNumber(this);
};

//# обработчик закрывает модальное окно при клике на крестик
const onCloseButtonElementClick = () => {
  closeModal();
};

//@ функция, открывающая модальное окно
const openModal = () => {
  modalElement.classList.remove('hidden');

  closeButtonElement.addEventListener('click', onCloseButtonElementClick);
  document.addEventListener('keydown', onEscKeydown);

  document.body.classList.add('modal-open');

  showMoreCommentsButton.addEventListener('click', onShowMoreCommentsButtonClick);
};

//@ функция, закрывающая модальное окно
const closeModal = () => {
  modalElement.classList.add('hidden');

  closeButtonElement.removeEventListener('click', onCloseButtonElementClick);
  document.removeEventListener('keydown', onEscKeydown);

  document.body.classList.remove('modal-open');

  showMoreCommentsButton.removeEventListener('click', onShowMoreCommentsButtonClick);
};
