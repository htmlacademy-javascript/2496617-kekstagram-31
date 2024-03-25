//# получение данных для отрисовки миниатюр

const pictures = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json());

export { pictures };
