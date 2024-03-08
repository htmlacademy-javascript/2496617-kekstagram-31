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
	const commentsCountNode = modalNode.querySelector('.social__comment-count');

	//# блок списка комментариев
	const modalCommentsContainerNode = modalNode.querySelector('.social__comments');

	const shownComentsNode = commentsCountNode.querySelector('.social__comment-shown-count');
	const totalComentsNode = commentsCountNode.querySelector('.social__comment-total-count');

	//# перебор массива ----- деструктуризация элемента массива
	picturesArray.forEach(({ id, url, likes, comments, description }) => {

		//# проверка, что id в объекте-фотографии соответствует номеру нажатой миниатюры
		if (id == clickedPicture.id) {

			//# заполнение модального окна соответствующими данными
			modalNode.querySelector('.big-picture__img img').src = url;
			modalNode.querySelector('.likes-count').textContent = likes;
			totalComentsNode.textContent = comments.length;

			//# корректировка числа показываемых комментариев
			if (totalComentsNode.textContent <= 5) {
				shownComentsNode.textContent = totalComentsNode.textContent;
			}

			modalNode.querySelector('.social__caption').textContent = description;

			//# обнуление блока-списка комментариев
			modalCommentsContainerNode.innerHTML = null;

			//# заполнение блока-списка соответствующими комментариями
			for (let comment of comments) {
				modalCommentsContainerNode.append(createComment(comment.avatar, comment.name, comment.message));
			}
		}
	});

}

export { fillModal };