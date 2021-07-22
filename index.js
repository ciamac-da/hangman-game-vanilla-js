const wordEl = document.getElementById("word")
const wrongLetterEl = document.getElementById("wrong-letters")
const playAgainBtn = document.getElementById("play-again")
const popup = document.getElementById("popup-container")
const notification = document.getElementById("notification-container")
const finalMessage = document.getElementById("final-message")
const figureParts = document.querySelectorAll(".figure-part")

const words = ["application", "programming", "wizard", "javascript"]
let selectedWord = words[Math.floor(Math.random() * words.length)]

let correctLetters = []
let wrongLetters = []

// Show hidden word
const displayWord = () => {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(letter =>`
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
      </span>
      `
  )
    .join("")
  }
  `
  const innerWord = wordEl.innerText.replace(/\n/g,"")
  if(innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!"
    popup.style.display = "flex"
  }
}

// Update the wrong letters
const updateWrongLettersEl = () => {

 // Hide display wrong 
  if(wrongLetters.length === 0) {
    wrongLetters.map(letter => `<span>${letter}</span>`)
    wrongLetterEl.innerHTML = `${wrongLetters}`
  }

 // Display wrong letter
  if(wrongLetters.length > 0) {
    wrongLetters.map(letter => `<span>${letter}</span>`)
    wrongLetterEl.innerHTML = `
    <p>Wrong Letter</p>
     ${wrongLetters}
    `
  }
  // Display wrong letters
   if(wrongLetters.length > 1 ) {
    wrongLetters.map(letter => `<span>${letter}</span>`)
    wrongLetterEl.innerHTML = `
    <p>Wrong Letters</p>
    ${wrongLetters}
    `

    // Check if Lost
    if (wrongLetters.length === figureParts.length) {
      finalMessage.innerText = "Unfortunately you lost"
      popup.style.display = "flex"
    }
  }

// Display Parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length

    if(index < errors) {
      part.style.display = "block"
    } else {
      part.style.display = "none"
    }
  })
}

// Show notification
const showNotification = () => {
  notification.classList.add("show")

  setTimeout(()=> {
    notification.classList.remove("show")
  }, 2000)
}



// Keydown letter press
window.addEventListener("keydown", e => {
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord()
      } else {
        showNotification()
      }
    } else {
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)
        updateWrongLettersEl()
      } else {
        showNotification()
      }
    }
  }
})

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  // Empty Arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = "none"
});

displayWord()
