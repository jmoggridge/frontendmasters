const rows = document.querySelectorAll('.row');
const spinner = document.querySelector('.spinner');

function getInputs() {
  let inputs = [];
  for (let i = 0; i < rows.length; i++) {
    let row = [];
    for (let j = 0; j < 5; j++) {
      const index = `r${i}-l${j}`;
      const input = document.getElementById(index);
      input.style.cursor = 'none';
      input.addEventListener('keydown', handleLetter);
      input.addEventListener('keyup', (event) => keyupActions(event, i, j));
      if (i > 0) {
        input.disabled = true;
      }
      row.push(input);
    }
    inputs.push(row);
  }
  inputs[0][0].focus();
  return inputs;
}

async function getWordOfDay() {
  try {
    const promise = await fetch(
      'https://words.dev-apis.com/word-of-the-day?random=1'
    );
    const payload = await promise.json();
    return payload.word.toLowerCase();
  } catch (e) {
    alert('fetch word error', e);
  }
}

async function validateWord(word) {
  try {
    const promise = await fetch('https://words.dev-apis.com/validate-word', {
      method: 'POST',
      body: JSON.stringify({ word: word })
    });
    const response = await promise.json();
    return response?.validWord;
  } catch (e) {
    alert('validate word error', e);
  }
}

function getGuessFromInputs(inputs, i) {
  let string = '';
  for (let j = 0; j < 5; j++) {
    string += inputs[i][j].value;
  }
  return string.toLowerCase();
}

function wordmap(array) {
  let obj = {};
  for (let i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      obj[array[i]]++;
    } else {
      obj[array[i]] = 1;
    }
  }
  return obj;
}

function colorLetters(guess, wordOfTheDay, i) {
  // count letters
  const guessMap = wordmap(guess);
  const answerMap = wordmap(wordOfTheDay);

  // find exact matches and subtract from remaining letters
  let exact = [];
  for (let j = 0; j < 5; j++) {
    if (guess[j] === wordOfTheDay[j]) {
      inputs[i][j].classList.add('correct-letter');
      guessMap[guess[j]]--;
      answerMap[guess[j]]--;
      exact.push(j);
    }
  }
  // otherwise highlight letter if elsewhere in word (excluding exact matches)
  for (let j = 0; j < 5; j++) {
    if (exact.includes(j)) {
      continue;
    }
    if (answerMap[guess[j]] > 0) {
      inputs[i][j].classList.add('letter-in-word');
      answerMap[guess[j]]--;
    } else {
      inputs[i][j].classList.add('not-in-word');
    }
  }
}

function handleLetter(event) {
  if (isLetter(event.key) === false) {
    event.preventDefault();
  }
}

function keyupActions(event, i, j) {
  const guess = getGuessFromInputs(inputs, i);
  const row = document.getElementById(`r${i}`);
  row.classList.remove('invalid-word');

  if (isLetter(event.key) && event.target.value) {
    if (j < 4) {
      inputs[i][j + 1].focus();
    }
  }
  // backspace  deletes letter or goes back one square and delete that
  if (event.key === 'Backspace' && !event.target.value && j > 0) {
    inputs[i][j - 1].focus();
  }
  if (event.key === 'Backspace' && event.target.value) {
    event.target.value = '';
  }

  // enter solution. check solution
  if (event.key === 'Enter' && guess.length === 5) {
    spinner.classList.remove('hidden');

    validateWord(guess)
      .then((valid) => {
        spinner.classList.add('hidden');
        if (!valid || guesses.includes(guess)) {
          row.classList.add('invalid-word');
          spinner.classList.add('hidden');
          return;
        }
        colorLetters(guess, wordOfTheDay, i);
        handleOutcome(guess, i);
        return;
      })
      .catch((e) => alert('caugth error', e.message));
  }
}

function handleOutcome(guess, i) {
  // handle win
  if (guess === wordOfTheDay) {
    alert('Success. You win.');
    for (let x = 0; x < 5; x++) {
      inputs[i][x].disabled = true;
    }
  } else {
    guesses.push(guess);
    if (guesses.length === 6) {
      alert(`You lost. The word was ${wordOfTheDay}`);
      spinner.classList.add('hidden');
      return;
    }
    for (let x = 0; x < 5; x++) {
      inputs[i][x].disabled = true;
      inputs[i + 1][x].disabled = false;
    }
    inputs[i + 1][0].focus();
  }
}

function isLetter(letter) {
  return /^[A-Za-z]$/.test(letter);
}

// game script
let guesses = [];
let solved = false;
let wordOfTheDay = null;
getWordOfDay()
  .then(function (word) {
    wordOfTheDay = word;
  })
  .catch((e) => {
    console.error(e);
  });
const inputs = getInputs();
