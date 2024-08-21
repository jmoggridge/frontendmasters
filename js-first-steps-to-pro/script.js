// script.js

//* The DOM

// access the dom
document;
// get attributes of the document
document.title;
// get elements from the document
document.body.children;

// get elements using id
const board = document.getElementById('board');

// get elements using css
const board2 = document.querySelector('#board');

board == board2;

// get elements by tag
let h1s = document.getElementsByTagName('h1');
h1s = document.querySelectorAll('h1');

const players = document.querySelectorAll('.player');

document.getElementsByTagName('p');
// html collection 2 elements
document.querySelector('#p1-symbol').textContent;
// X
document.querySelector('#board').children.length;
// 9
document.querySelector('h2').textContent;
// the game you know

// edit the document content
document.title = 'toetactic';

// switch names
let p1symbol = document.querySelector('#p1-symbol').textContent;
let p2symbol = document.querySelector('#p2-symbol').textContent;
document.querySelector('#p1-symbol').textContent = p2symbol;
document.querySelector('#p2-symbol').textContent = p1symbol;
document.querySelector('h2').append(', new and improved');

//* Strings
const string = 'abcdefghijklmnopqrstuvwyxz';
const letter2 = string[1];

// string.indexOf(pattern) returns index of first appearance or -1 if not found
string.indexOf('d');
// string.includes(substring) returns boolean
string.includes('h');
// includes at start
string.startsWith('abc');
// concat strings
string + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

string.toUpperCase();
string.toLowerCase();
string.append(' xyz');
