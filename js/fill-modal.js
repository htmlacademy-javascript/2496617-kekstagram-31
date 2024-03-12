import { picturesArray } from "./data.js";

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
}

// создание коллекции Map из массива объектов-фотографий, в которой элементы - это массивы пар [id - (сам)объект]
const picturesMap = picturesArray.reduce((map, pictureObject) => {
	map.set(pictureObject.id, pictureObject)
	return map;
}, new Map());


//@ функция, наполняющая модальное окно
const fillModal = (clickedPicture, modalNode, showMoreCommentsBtn) => {

	const { url, likes, comments, description } = picturesMap.get(Number(clickedPicture.id));

	modalNode.querySelector('.big-picture__img img').src = url;
	modalNode.querySelector('.likes-count').textContent = likes;
	modalNode.querySelector('.social__comment-total-count').textContent = comments.length;
	modalNode.querySelector('.social__caption').textContent = description;

	// блок списка комментариев
	const modalCommentsContainerNode = modalNode.querySelector('.social__comments');
	// обнуление блока-списка комментариев
	modalCommentsContainerNode.innerHTML = null;
	// заполнение блока-списка соответствующими комментариями	
	comments.forEach(comment => {
		modalCommentsContainerNode.append(createComment(comment.avatar, comment.name, comment.message));
	})

	// скрытие всех комментариев
	hideAllComments(modalNode);

	// показ сразу 5 комментариев
	showComments(modalNode);

	// корректировка количества показываемых комментариев
	matchShownCommentsNumber(showMoreCommentsBtn);
}

//@ функция, скрывающая все комментарии
const hideAllComments = (modalNode) => {
	const commentsArray = modalNode.querySelectorAll('.social__comment');
	commentsArray.forEach(comment => {
		if (comment) {
			comment.hidden = true;
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
const matchShownCommentsNumber = (btnItSelf) => {
	const shownCommentsNumberNode = document.querySelector('.social__comment-shown-count');

	const totalCommentsArray = [...document.querySelectorAll('.social__comment')];
	const shownCommentsArray = totalCommentsArray.filter(comment => !comment.hasAttribute('hidden'))

	shownCommentsNumberNode.textContent = shownCommentsArray.length;

	toggleShowMoreCommentsBtnVisibility(totalCommentsArray.length, shownCommentsArray.length, btnItSelf);
}

//@ функция, показывающая/скрывающая кнопку "показать ещё"
const toggleShowMoreCommentsBtnVisibility = (totalNum, ShownNum, btn) => {
	if (totalNum == ShownNum) {
		btn.setAttribute('hidden', true);
	} else {
		btn.removeAttribute('hidden');
	}
}

export { fillModal, showComments, matchShownCommentsNumber };