var player1NameInput = document.getElementById('player1-name-input');
var player2NameInput = document.getElementById('player2-name-input');
var playGameButton1 = document.getElementById('intro-playgame-button');
var introParentSection = document.getElementById('main-intro-parentsection');
var mainParent = document.getElementById('main-parent');
var introErrorMessage = document.getElementById('introform-error-message');
var scoreCardButton = document.getElementById('scorecard-button');
var headerParent = document.getElementById('header-parent');
var cardsArray = [
  {id: "1", name: "one" },
  {id: "1", name: "two" },
  {id: "2", name: "three" },
  {id: "2", name: "four" },
  {id: "3", name: "five" },
  {id: "3", name: "six" },
  {id: "4", name: "seven" },
  {id: "4", name: "eight" },
  {id: "5", name: "nine" },
  {id: "5", name: "ten" }
];

mainParent.addEventListener('click', clickInMain);
window.addEventListener('load', onPageLoad);
scoreCardButton.addEventListener('click', showAndRemoveScoreCard);

function onPageLoad() {
  if("winner" in localStorage) {
    createScoreCard();
  }
}

function clickInMain() {
  makeErrorIfNoName();
  saveUserNamesLS();
  instantiateCardAndDeck();
  recreateCardsAtRandom()
  flipCard();
}

function makeErrorIfNoName() {
  if (event.target.classList.contains('intro-playgame-button')) {
    if (player1NameInput.value === "" || player2NameInput.value === "") {
      player1NameInput.classList.add('error-state');
      player2NameInput.classList.add('error-state');
      introErrorMessage.classList.add('introform-no-input-error');
      introErrorMessage.innerHTML = "PLEASE ENTER YOUR NAME!!!"
    } else {
      moveToInstructionPage();
    }
  }
}

function saveUserNamesLS() {
  if (event.target.classList.contains('intro-playgame-button')) {
    var player1 = {name: player1NameInput.value};
    var player2 = {name: player2NameInput.value};
    var players = [player1, player2];
    var playersString = JSON.stringify(players);
    localStorage.setItem("players", playersString);
  }
}

function moveToInstructionPage() {
  introParentSection.remove();
  mainParent.innerHTML = `
    <section class="main-instruction-section" id="main-instruction-parentsection">
      <h2 class="instruction-section-header">WELCOME <span>${player1NameInput.value}</span> AND <span>${player2NameInput.value}</span>!</h2>
      <div class="instructop-paragraph-background">
      <p class="instruction-section-paragraph">The goal of the game is to find all 5 pairs of cards as quickly as possible.
      The player that finds the greatest numbers of pairs, wins.</p>
      <p class="instruction-section-paragraph">To begin playing, the player whose name is highlighted can click any card in the card
      pile. It will flip over and reveal a picture of Beyonce. Click another card. If they match, they will disappear and you will
      have completed a match! If they don't, you'll have three seconds to look at them before they flip back over. Then it's time
      for the other player to try!</p>
      <p class="instruction-section-paragraph">After youy play, you'll see the name of the final winnner and how long it took to
      win the game.</p>
      </div>
      <button class="playgame-button instruction-playgame-button" id="instruction-playgame-button">PLAY GAME </button>
    </section>`;
}

function instantiateCardAndDeck() {
  if (event.target.classList.contains('instruction-playgame-button')) {
    var cards = [];
    for (var i = 0; i < cardsArray.length; i++) {
      var card = new Card(cardsArray[i].id, cardsArray[i].name);
      cards.push(card);
    }
    deck = new Deck(cards);
  }
}

function updateMatchCount() {
  var player1Matches = document.getElementById('player1-matches');
  var player2Matches = document.getElementById('player2-matches');
  if (deck.totalGuesses % 2 === 1) {
    deck.player1Matches ++;
    player1Matches.innerText = `${deck.player1Matches}`;
  } else {
    deck.player2Matches ++;
    player2Matches.innerText = `${deck.player2Matches}`;
  }
}

function removeCardSection() {
  var cardSection = document.getElementById('card-section');
  while(cardSection.firstChild) {
    cardSection.removeChild(cardSection.firstChild);
  }
}

function getGameTime() {
  var gameTimes = [];
  var endTime = new Date();
  var sEnd = endTime.getSeconds();
  var mEnd = endTime.getMinutes();
  var totalMin = mEnd - mStart;
  gameTimes.push(totalMin);
  var totalSec = (((mEnd * 60) + sEnd) - ((mStart * 60) + sStart));
  if (totalSec > 60) {
    var actualSec = totalSec % 60;
    gameTimes.push(actualSec);
  }
  if (totalSec < 60) {
    gameTimes.push(totalSec);
  }
  return gameTimes;
}

function createWinnerCard(player) {
  var gameTime = getGameTime();
  return `
  <div class="winner-card-div">
    <h2 class="winner-card-h2">CONGRATULATIONS!!<h2>
    <h4 class="winner-card-h4"><span class="winner-card-winner">${player.value}</span> HAS WON THE GAME!!<h4>
    <img class="winner-card-gif" src="https://media.giphy.com/media/cOB8cDnKM6eyY/giphy.gif" alt="gif from Billy Madison saying 'I am the smartest man alive!'" >
    <h6 class="winner-card-h4"> It took you ${gameTime[0]} minutes and ${gameTime[1]} seconds to win!</h6>
  </div>`;
}

function addWinnerToLS(winner) {
  var winnersToParse = localStorage.getItem("winner");
  winnersFromLS = JSON.parse(winnersToParse);
  var gameTime = getGameTime();
  var newWinner = [{name: winner.value, time: gameTime}];
  if (winnersFromLS === null) {
    var winnerToStore = JSON.stringify(newWinner);
    localStorage.setItem("winner", winnerToStore);
  } else {
    winnersFromLS = winnersFromLS.concat(newWinner);
    var winnersToStore = JSON.stringify(winnersFromLS);
    localStorage.setItem("winner", winnersToStore);
  }
}

function displayWinner() {
  var cardSection = document.getElementById('card-section');
  if (deck.matches === 5 && deck.player1Matches > deck.player2Matches) {
    removeCardSection();
    cardSection.innerHTML = createWinnerCard(player1NameInput);
    addWinnerToLS(player1NameInput);
  } else if(deck.matches === 5 && deck.player1Matches < deck.player2Matches) {
    removeCardSection();
    cardSection.innerHTML = createWinnerCard(player2NameInput);
    addWinnerToLS(player2NameInput);
  }
}

function removeMatchedCards() {
  var cardID = event.target.dataset.id;
  deck.selectedCards.splice(0, 2);
  var cardsToDelete = document.querySelectorAll(`[data-id='${cardID}']`);
  cardsToDelete.forEach(function(card) {
    card.classList.add('hidden');
  });
}

function matchCards() {
  if (deck.selectedCards.length === 2 && deck.checkSelectedCards() === true) {
    deck.selectedCards.forEach(function(card) {
      card.match();
    });
    deck.moveToMatched();
    deck.matches ++;
    removeMatchedCards();
    updateMatchCount();
    displayWinner();
  }
}

function flipCard() {
  if(event.target.classList.contains('gameplay-card')) {
    var cardID = event.target.dataset.id;
    var cardName = event.target.dataset.name;
    var cardSelected = deck.cards.filter(function(array) {
      return array.name === cardName;
    });
      if(event.target.innerText.length > 1 && deck.selectedCards.length < 2) {
        event.target.classList.add(`photo${cardID}`);
        event.target.innerText = "";
        deck.selectedCards = deck.selectedCards.concat(cardSelected);
        matchCards();
        setTimeout(flipCardOnTimer, 2500);
      }
    }
}

function flipCardOnTimer() {
  if (deck.selectedCards.length === 2) {
    var cardsFromDOM = document.querySelectorAll('.gameplay-card');
    var cardsFromDOMArr = Array.from(cardsFromDOM);
    var cardsToFlipBack = cardsFromDOMArr.filter(function(array) {
      return deck.selectedCards[0].name === array.dataset.name || deck.selectedCards[1].name === array.dataset.name;
    });
    for (var i = 0; i < cardsToFlipBack.length; i++) {
      var cardID = cardsToFlipBack[i].dataset.id;
      cardsToFlipBack[i].classList.remove(`photo${cardID}`);
      cardsToFlipBack[i].innerText = "NP";
      deck.selectedCards.splice(0, 2);
    }
  }
}

function getStartTime() {
  var startTime = new Date();
  sStart = startTime.getSeconds();
  mStart = startTime.getMinutes();
}

function showAndRemoveScoreCard() {
  var scoreBoard = document.getElementById('winner-scoreboard');
  scoreBoard.classList.toggle('hidden');
}

function createScoreCard() {
  var scoreCardHTML = createScoreCardHTML();
  headerParent.insertAdjacentHTML('afterbegin', scoreCardHTML);
}

function arrangeWinnersFromLS() {
    var winnersFromLS = localStorage.getItem("winner");
    var winners = JSON.parse(winnersFromLS);
    for (var i = 0; i < winners.length; i++) {
      var timeInSec = (winners[i].time[0] * 60 + winners[i].time[1]);
      winners[i].time = timeInSec;
    }
    winners.sort(function(a, b) {
      return a.time - b.time;
    });
    var winnersConvertedArray = convertWinnersTimeToMinSec(winners);
    return winnersConvertedArray;
}

function convertWinnersTimeToMinSec(array) {
  for (var i = 0; i < array.length; i++) {
    var minutes = Math.floor(array[i].time / 60)
    var seconds = array[i].time % 60;
    array[i].time = [];
    array[i].time.push(minutes);
    array[i].time.push(seconds);
  }
  return array;
}

function createScoreCardHTML() {
    var winnersInfo = arrangeWinnersFromLS();
    winnersInfo.splice(5, 100);
    var winnerInfoDiv = '';
    for (var i = 0; i < winnersInfo.length; i++) {
      winnerInfoDiv += `
      <div class="winner-scoreboard-div">
        <p>${winnersInfo[i].name}</p>
        <p>${winnersInfo[i].time[0]}m ${winnersInfo[i].time[1]}s</p>
        <p>#${i + 1} Top Player</p>
      </div>`
    }
    return `
      <section class="winner-scoreboard-section hidden" id="winner-scoreboard">
        ${winnerInfoDiv}
      </section>
      `
}

function recreateCardsAtRandom() {
  if (event.target.classList.contains('instruction-playgame-button')) {
    deck.shuffle(deck.cards);
    getStartTime();
    var instructionParentSection = document.getElementById('main-instruction-parentsection');
    instructionParentSection.remove();
    mainParent.innerHTML = `
    <section class="main-gameplay-parentsection">
      <aside class="gameplay-player-info-section">
        <div class="player-info-name">
          <p class="player-info-text"><span>${player1NameInput.value}</span></p>
        </div>
        <div class="player-info-matches">
          <p class="player-info-matches-text">MATCHES THIS ROUND</p>
          <p><span class="player-info-matches-num" id="player1-matches">0</span></p>
        </div>
        <div class="player-info-games-won">
          <p class="player-info-text"> GAME WINS</p>
        </div>
      </aside>
      <section class="gameplay-card-section" id="card-section">
        <div class="gameplay-card-div">
          <div class="gameplay-card position1" data-id='${deck.cards[0].matchInfo}' data-name="${deck.cards[0].name}">NP</div>
          <div class="gameplay-card position2" data-id='${deck.cards[1].matchInfo}' data-name="${deck.cards[1].name}">NP</div>
          <div class="gameplay-card position3" data-id='${deck.cards[2].matchInfo}' data-name="${deck.cards[2].name}">NP</div>
        </div>
        <div class="gameplay-card-div">
          <div class="gameplay-card position4" data-id='${deck.cards[3].matchInfo}' data-name="${deck.cards[3].name}">NP</div>
          <div class="gameplay-card position5" data-id='${deck.cards[4].matchInfo}' data-name="${deck.cards[4].name}">NP</div>
          <div class="gameplay-card position6" data-id='${deck.cards[5].matchInfo}' data-name="${deck.cards[5].name}">NP</div>
          <div class="gameplay-card position7" data-id='${deck.cards[6].matchInfo}' data-name="${deck.cards[6].name}">NP</div>
        </div>
        <div class="gameplay-card-div">
          <div class="gameplay-card position8" data-id='${deck.cards[7].matchInfo}' data-name="${deck.cards[7].name}">NP</div>
          <div class="gameplay-card position9" data-id='${deck.cards[8].matchInfo}' data-name="${deck.cards[8].name}">NP</div>
          <div class="gameplay-card position10" data-id='${deck.cards[9].matchInfo}' data-name="${deck.cards[9].name}">NP</div>
        </div>
      </section>
      <aside class="gameplay-player-info-section">
        <div class="player-info-name">
          <p class="player-info-text"><span>${player2NameInput.value}</span></p>
        </div>
        <div class="player-info-matches">
          <p class="player-info-matches-text">MATCHES THIS ROUND</p>
          <p><span class="player-info-matches-num" id="player2-matches">0</span></p>
        </div>
        <div class="player-info-games-won">
          <p class="player-info-text"> GAME WINS</p>
        </div>
      </aside>
    </section>`;
  }
}
