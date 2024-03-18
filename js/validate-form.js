import { splitInput } from "./util.js";

const form = document.querySelector('.img-upload__form');

/*?// ?------------ |> Pristine is not defined? |>------------? //?*/
const pristine = new Pristine(form, {
	classTo: 'img-upload__field-wrapper',
	errorClass: 'img-upload__field-wrapper--invalid',
	successClass: 'img-upload__field-wrapper--valid',
	errorTextParent: 'img-upload__field-wrapper',
	errorTextTag: 'div',
	errorTextClass: 'img-upload__field-wrapper--error'
});



// $------------------------ валидация хэштегов ------------------------$ //
const hashtagInputNode = form.querySelector('.text__hashtags');
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

//@ функция, проверяющая, что хэштег соответствует регулярному выражению
const validateHashtag = (hashtag) => hashtagRegExp.test(hashtag);

//@ функция, проверяющая хэштеги на формат
const validateHashtagsFormat = () => {
	if (hashtagInputNode.value != '') {
		const isEveryHashtagValid = splitInput(hashtagInputNode).every(hashtagElem => validateHashtag(hashtagElem));
		return isEveryHashtagValid;
	}
	return true;
};

//@ функция, проверяющая хэштеги на количество
const validateHashtagsAmount = () =>
	hashtagInputNode.value == '' || splitInput(hashtagInputNode).length <= 5;


//@ функция, проверяющая повторы хэштегов
const validateHashtagsDuplicates = () =>
	new Set(splitInput(hashtagInputNode)).size == splitInput(hashtagInputNode).length;



//# валидация формата хэштегов
pristine.addValidator(
	hashtagInputNode,
	validateHashtagsFormat,
	'хэштег должен начинаться с символа # и быть не более 20 символов'
);

//# валидация количества хэштегов
pristine.addValidator(
	hashtagInputNode,
	validateHashtagsAmount,
	'количество хэштегов должно быть не более 5'
);
//# валидация повтора хэштегов
pristine.addValidator(
	hashtagInputNode,
	validateHashtagsDuplicates,
	'хэштеги не должны повторяться'
);
// $-------------------------------------------------------------------$ //


// $------------------------ валидация комментария ------------------------$ //
const commentInputNode = document.querySelector('.text__description');
//@ функция, проверяющая поле комментария на валидность
const validateCommentInput = () => {
	if (commentInputNode.value == '' || commentInputNode.value.length <= 140) {
		return true;
	}
	return false;
};

//# валидация инпута комментария
pristine.addValidator(
	commentInputNode,
	validateCommentInput,
	'комментарий должен быть не более 140 символов'
);
// $-----------------------------------------------------------------------$ //



//# обработчик отправки формы
const onFormSubmit = (evt) => {
	const isValid = pristine.validate();
	
	if (isValid) {
		console.log('можно отправлять');
	} else {
		evt.preventDefault();
		console.log('форма не валидна');
	}
}
//# отправка формы
form.addEventListener('submit', onFormSubmit);
