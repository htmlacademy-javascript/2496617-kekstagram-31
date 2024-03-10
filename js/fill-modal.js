import { picturesArray } from "./data.js";

//@ функция, создающая комментарий
const createComment = (src, name, message) => {
	const comment = document.createElement('li');
	comment.classList.add('social__comment');

	const commentImg = document.createElement('img');
	commentImg.src = src;
	commentImg.alt = name;
	commentImg.style.width = 35 + 'px';
	commentImg.style.height = 35 + 'px';

	const commentMessage = document.createElement('p');
	commentMessage.textContent = message;

	comment.append(commentImg, commentMessage);

	return comment;
}


//@ функция, наполняющая модальное окно
const fillModal = (modalNode, clickedPicture) => {

	//# блок количества комментариев
	const shownComentsNode = modalNode.querySelector('.social__comment-shown-count');
	const totalCommentsNode = modalNode.querySelector('.social__comment-total-count');

	//# блок списка комментариев
	const modalCommentsContainerNode = modalNode.querySelector('.social__comments');

	//# перебор массива фотографий
	picturesArray.forEach(({ id, url, likes, comments, description }) => {

		//# проверка, что id в объекте-фотографии соответствует номеру нажатой миниатюры
		if (id == clickedPicture.id) {

			//# заполнение модального окна соответствующими данными
			modalNode.querySelector('.big-picture__img img').src = url;
			modalNode.querySelector('.likes-count').textContent = likes;
			totalCommentsNode.textContent = comments.length;

			modalNode.querySelector('.social__caption').textContent = description;

			//# обнуление блока-списка комментариев
			modalCommentsContainerNode.innerHTML = null;

			//# заполнение блока-списка соответствующими комментариями
			for (let comment of comments) {
				modalCommentsContainerNode.append(createComment(comment.avatar, comment.name, comment.message));
			}


			//# скрытие всех комментариев
			const commentsArray = modalNode.querySelectorAll('.social__comment');
			commentsArray.forEach(comment => {
				if (comment) {
					comment.hidden = true;
				}
			});

			//# показ 5 комментариев
			showComments(modalNode);

			//# корректировка количества комментариев (пока не работает в полной мере)
			correctShownCommentsNumber(shownComentsNode, totalCommentsNode);

			const showMoreCommentsBtn = modalNode.querySelector('.social__comments-loader');
			showMoreCommentsBtn.addEventListener('click', onShowMoreCommentsBtnClick);
		}
	});

}

//@ функция, показывающая 5 комментариев
const showComments = () => {
	const hiddenComments = document.querySelectorAll('.social__comment[hidden]');

	for (let i = 0; i < 5; i++) {
		if (hiddenComments[i]) {
			hiddenComments[i].hidden = false;
		}
	}
}

//@ функция, корректирующая число показываемых комментариев
const correctShownCommentsNumber = (shownCommentsNode, totalCommentsNode) => {
	if (totalCommentsNode.textContent <= 5) {
		shownCommentsNode.textContent = totalCommentsNode.textContent;
	} else {

		shownCommentsNode.textContent = 5;
	}
}

//# обработчик нажатия на кнопку показа больше комментариев
const onShowMoreCommentsBtnClick = () => {
	showComments();
	// correctShownCommentsNumber(shownComentsNode, totalCommentsNode);
}

export { fillModal };