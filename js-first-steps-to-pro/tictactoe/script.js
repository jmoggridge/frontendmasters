const players = [{ name: 'x' }, { name: 'o' }];
const p1 = document.getElementById('p1-name');
const p2 = document.getElementById('p2-name');

p1.textContent = 'AAA';
p2.textContent = 'BBB';

const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
console.log(p1, p2, board, squares);

squares[0].textContent = '0';
squares[1].textContent = '0';
squares[2].textContent = '0';
squares[3].textContent = '0';
squares[4].textContent = '0';
squares[5].textContent = '0';
squares[6].textContent = '0';
squares[7].textContent = '0';
squares[8].textContent = '0';
squares[9].textContent = '0';
