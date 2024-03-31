// $------------------------ UPLOAD PHOTO ------------------------$ //
// $------------------------ UPLOAD PHOTO ------------------------$ //

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const isAcceptableType = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (isAcceptableType) {
    preview.src = URL.createObjectURL(file);

    effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url('${preview.src}')`;
    });
  }
});