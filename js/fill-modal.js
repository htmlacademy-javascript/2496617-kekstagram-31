import { picturesArray } from './data.js';

//# максимальное количество показываемых комментариев
const MAX_SHOWN_COMMENTS_AMOUNT = 5;

//@ функция, создающая комментарий
const createComment = (src, name, message) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const commentImg = document.createElement('img');
  commentImg.classList.add('social__picture');
  commentImg.src = src;
  commentImg.alt = name;
  commentImg.style.width = '35px';
  commentImg.style.height = '35px';

  const commentMessage = document.createElement('p');
  commentMessage.classList.add('social__text');
  commentMessage.textContent = message;

  comment.append(commentImg, commentMessage);

  return comment;
};

// создание коллекции Map из массива объектов-фотографий, в которой элементы - это массивы пар [id - (сам)объект]
const picturesMap = picturesArray.reduce((map, pictureObject) => {
  map.set(pictureObject.id, pictureObject);
  return map;
}, new Map());

//@ функция, скрывающая все комментарии
const hideAllComments = (modalElement) => {
  const commentsArray = modalElement.querySelectorAll('.social__comment');
  commentsArray.forEach((comment) => {
    if (comment) {
      comment.hidden = true;
    }
  });
};

//@ функция, показывающая 5 комментариев
const showComments = () => {
  const hiddenComments = document.querySelectorAll('.social__comment[hidden]');

  for (let i = 0; i < MAX_SHOWN_COMMENTS_AMOUNT; i++) {
    if (hiddenComments[i]) {
      hiddenComments[i].hidden = false;
    }
  }
};
//@ функция, показывающая/скрывающая кнопку 'показать ещё'
const toggleShowMoreCommentsButtonVisibility = (totalNum, ShownNum, Button) => {
  if (totalNum === ShownNum) {
    Button.setAttribute('hidden', true);
  } else {
    Button.removeAttribute('hidden');
  }
};

//@ функция, корректирующая число показываемых комментариев
const matchShownCommentsNumber = (ButtonItself) => {
  const shownCommentsNumberElement = document.querySelector('.social__comment-shown-count');

  const totalCommentsArray = [...document.querySelectorAll('.social__comment')];
  const shownCommentsArray = totalCommentsArray.filter((comment) => !comment.hasAttribute('hidden'));

  shownCommentsNumberElement.textContent = shownCommentsArray.length;

  toggleShowMoreCommentsButtonVisibility(totalCommentsArray.length, shownCommentsArray.length, ButtonItself);
};

//@ функция, наполняющая модальное окно
const fillModal = (clickedPicture, modalElement, showMoreCommentsButton) => {

  const { url, likes, comments, description } = picturesMap.get(Number(clickedPicture.id));

  modalElement.querySelector('.big-picture__img img').src = url;
  modalElement.querySelector('.likes-count').textContent = likes;
  modalElement.querySelector('.social__comment-total-count').textContent = comments.length;
  modalElement.querySelector('.social__caption').textContent = description;

  // блок списка комментариев
  const modalCommentsContainerElement = modalElement.querySelector('.social__comments');
  // обнуление блока-списка комментариев
  modalCommentsContainerElement.innerHTML = null;
  // заполнение блока-списка соответствующими комментариями
  comments.forEach((comment) => {
    modalCommentsContainerElement.append(createComment(comment.avatar, comment.name, comment.message));
  });

  // скрытие всех комментариев
  hideAllComments(modalElement);

  // показ сразу 5 комментариев
  showComments(modalElement);

  // корректировка количества показываемых комментариев
  matchShownCommentsNumber(showMoreCommentsButton);
};


export { fillModal, showComments, matchShownCommentsNumber };
