// /* eslint-disable indent */
/* eslint-disable no-console */
// 1. Функция для проверки длины строки

const checkStringLength = (string, maxLength) => string.length <= maxLength;

console.log(checkStringLength('проверяемая строка', 10)); // false
console.log(checkStringLength('проверяемая строка', 12)); // false
console.log(checkStringLength('проверяемая строка', 18)); // true
console.log(checkStringLength('проверяемая строка', 20)); // true
console.log(checkStringLength('проверяемая строка', 25)); // true

// 2. Функция, проверяющая, является ли строка палиндромом

const isPalindrome = (string) => {
    const normalString = string.replaceAll(' ', '').toLowerCase();
    let newString = '';

    for (let i = normalString.length - 1; i >= 0; i--) {
        newString += normalString[i];
    }
    return newString === normalString;
};

console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true


// 3. Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:
const BASE = 10;
const extractNumber = (string) => {
    if (typeof (string) === 'number') {
        string = String(string);
    }
    let output = '';
    for (let i = 0; i < string.length; i++) {
        const char = parseInt(string[i], BASE);
        if (!Number.isNaN(char)) {
            output += char;
        }
    }
    if (!output) {
        return NaN;
    }
    return parseInt(output, BASE);
};

console.log(extractNumber('2023 год'));
console.log(extractNumber('ECMAScript 2022'));
console.log(extractNumber('1 кефир, 0.5 батона'));
console.log(extractNumber('агент 007'));
console.log(extractNumber('а я томат'));
console.log(extractNumber(2023));
console.log(extractNumber(-1));
console.log(extractNumber(1.5));