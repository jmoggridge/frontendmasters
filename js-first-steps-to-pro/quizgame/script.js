function FactList() {
  const facts = [
    {
      statement: 'null === undefined ? ',
      answer: false,
      explanation:
        'The strict equator operator `===` does not allow for any type coercion so null and undefined are considered not strictly equal.'
    },
    {
      statement: 'null == undefined ? ',
      answer: true,
      explanation:
        'the looser equator operator `==`  allows for type coercion, so null and undefined are considered equal.'
    },
    {
      statement: '"true" == true ? ',
      answer: false,
      explanation: 'Not equal. The expression evaluates to `false`. '
    },
    {
      statement: 'true == "true"  ? ',
      answer: false,
      explanation: "It's `false`. "
    },
    {
      statement: 'null == {} ? ',
      answer: false,
      explanation: 'Not equal. The expression evaluates to `false`. '
    },
    {
      statement: '[] == {} ? ',
      answer: false,
      explanation: 'Not equal. The expression evaluates to `false`. '
    },
    {
      statement: '[] + [] === []',
      answer: false,
      explanation:
        'Not equal. This expression evaluates to `false` because `[] + []` evaluates to empty string "". '
    },
    {
      statement: '[] + [] === ""',
      answer: true,
      explanation:
        'Equal. This expression evaluates to `true`   because `[] + []` evaluates to empty string "".'
    },
    {
      statement: '"" == false',
      answer: true,
      explanation: 'True. The empty string "" is falsy.'
    }
  ];
  const deck = shuffle(facts);
  return deck;
}

function shuffle(array) {
  let last = array.length;
  while (last != 0) {
    let random = Math.floor(Math.random() * last);
    last--;
    // swap last and random
    [array[last], array[random]] = [array[random], array[last]];
  }
  return array;
}

function disable(button) {
  button.disabled = true;
}
function enable(button) {
  button.disabled = false;
}
function isCorrect(guess) {
  return fact.answer == guess;
}

let facts = FactList();
let fact = facts.pop();
const statement = document.getElementById('statement');
statement.textContent = fact.statement;
const explanation = document.getElementById('explanation');
const optionButtons = document.getElementById('options').children;
const nextButton = document.querySelector('#next');
disable(nextButton);

for (let button of optionButtons) {
  button.addEventListener('click', function onGuess(e) {
    e.preventDefault();
    // 6bdisplay the fact's explanation by setting the text of the explanation element`;
    explanation.textContent = fact.explanation;

    // 7 Use a for loop to disable all the option buttons`;
    for (let button of optionButtons) {
      disable(button);
    }
    const guess = event.target.value == 'true';
    if (isCorrect(guess)) {
      explanation.classList.add('correct');
    } else {
      explanation.classList.add('incorrect');
    }
    enable(nextButton);
  });
}

console.log('optionButtons in script', optionButtons);

nextButton.addEventListener('click', function (event) {
  event.preventDefault();

  for (let button of optionButtons) {
    enable(button);
  }
  explanation.classList.remove('correct');
  explanation.classList.remove('incorrect');
  explanation.textContent = '';

  fact = facts.pop();
  statement.textContent = fact.statement;
  disable(nextButton);
  console.log('next');
  console.log(`Questions left: ${facts.length}`);

  if (!facts.length) {
    document.body.innerHTML = '<div class="over"><i>GAME OVER</i></div>';
  }
});
