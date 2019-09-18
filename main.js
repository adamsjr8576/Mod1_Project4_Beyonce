var mainParent = document.getElementById('main-parent');
var scoreCardButton = document.getElementById('scorecard-button');
var headerParent = document.getElementById('header-parent');
var cardsArray = [
  {id: "1", name: "card1-0"},
  {id: "2", name: "card2-0"},
  {id: "3", name: "card3-0"},
  {id: "4", name: "card4-0"},
  {id: "5", name: "card5-0"},
  {id: "6", name: "card6-0"},
  {id: "7", name: "card7-0"},
  {id: "8", name: "card8-0"},
  {id: "9", name: "card9-0"},
  {id: "10", name: "card10-0"}
];

mainParent.addEventListener('click', clickInMain);
window.addEventListener('load', onPageLoad);
scoreCardButton.addEventListener('click', showAndRemoveScoreCard);

function onPageLoad() {
createPlayerFormHTML();
createScoreCard();
}

function clickInMain() {
  makeErrorIfNoName(event);
  saveUserNamesLS(event);
  instantiateCardAndDeck(event);
  removeInstructionParent(event);
  recreateCardsAtRandom(event);
  getWinnersHistory(event);
  determineTopPLayer();
  flipCard(event);
  resetGame(event);
  rematchSetUp(event);
}

function createPlayerFormHTML() {
  mainParent.innerHTML = `
  <section class="main-introsection-player-input" id="main-intro-parentsection">
    <div class="introsection-form-parentdiv">
      <form class="introsection-player-form">
        <input class="introform-player-input" id="player1-name-input" maxlength="32" placeholder="Enter Name..."></input>
        <p class="introform-player-name-fixed">PLAYER 1</p>
      </form>
      <form class="introsection-player-form">
        <input class="introform-player-input" id="player2-name-input" maxlength="32" placeholder="Enter Name..."></input>
        <p class="introform-player-name-fixed">PLAYER 2</p>
      </form>
    </div>
    <div class="" id="introform-error-message"></div>
    <button class="playgame-button intro-playgame-button" id="intro-playgame-button">PLAY GAME</button>
  </section>`;
}


function makeErrorIfNoName(event) {
  var player1NameInput = document.getElementById('player1-name-input');
  var player2NameInput = document.getElementById('player2-name-input');
  var introErrorMessage = document.getElementById('introform-error-message');
  if (event.target.classList.contains('intro-playgame-button')) {
    if (player1NameInput.value === "" || player2NameInput.value === "") {
      player1NameInput.classList.add('error-state');
      player2NameInput.classList.add('error-state');
      introErrorMessage.classList.add('introform-no-input-error');
      introErrorMessage.innerHTML = "PLEASE ENTER YOUR NAME!!!"
    } else {
      instantiatePlayer1(player1NameInput);
      instantiatePlayer2(player2NameInput);
      moveToInstructionPage();
    }
  }
}

function instantiatePlayer1(player) {
  player1 = new Player(player.value);
}

function instantiatePlayer2(player) {
  player2 = new Player(player.value);
}

function saveUserNamesLS(event) {
  if (event.target.classList.contains('intro-playgame-button')) {
    var player1Info = {name: player1.name};
    var player2Info = {name: player2.name};
    var players = [player1Info, player2Info];
    var playersString = JSON.stringify(players);
    localStorage.setItem("players", playersString);
  }
}

function moveToInstructionPage() {
  var introParentSection = document.getElementById('main-intro-parentsection');
  introParentSection.remove();
  mainParent.innerHTML = `
    <section class="main-instruction-section" id="main-instruction-parentsection">
      <h2 class="instruction-section-header">WELCOME <span>${player1.name}</span> and <span>${player2.name}</span>!</h2>
      <div class="instruction-paragraph-background">
      <p class="instruction-section-paragraph">The goal of the game is to find all 5 pairs of cards as quickly as possible.
      The player that finds the greatest number of pairs, wins.</p>
      <p class="instruction-section-paragraph">To begin playing, the player whose name is highlighted can click any card in the card
      pile. It will flip over and reveal a picture of a beautiful landscape. Click another card. If they match, they will disappear and you will
      have completed a match! If they don't, you'll have two seconds to look at them before they flip back over. Then it's time
      for the other player to try!</p>
      <p class="instruction-section-paragraph">After youy play, you'll see the name of the final winnner and how long it took to
      win the game.</p>
      </div>
      <button class="playgame-button instruction-playgame-button" id="instruction-playgame-button">PLAY GAME </button>
    </section>`;
}

function instantiateCardAndDeck(event) {
  if (event.target.classList.contains('instruction-playgame-button') ||
      event.target.classList.contains('rematch-button')) {
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
    player1.matchCount ++;
    player1Matches.innerText = `${player1.matchCount}`;
  } else {
    player2.matchCount ++;
    player2Matches.innerText = `${player2.matchCount}`;
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
  var totalSec = (((mEnd * 60) + sEnd) - ((mStart * 60) + sStart));
  if (totalSec > 60) {
    var actualMin = Math.floor(totalSec / 60);
    var actualSec = totalSec % 60;
    gameTimes.push(actualMin);
    gameTimes.push(actualSec);
  }
  if (totalSec < 60) {
    var actualMin = 0;
    gameTimes.push(actualMin);
    gameTimes.push(totalSec);
  }
  return gameTimes;
}

function createWinnerCard(player) {
  var gameTime = getGameTime();
  return `
  <div class="winner-card-div">
    <h2 class="winner-card-h2">CONGRATULATIONS!!<h2>
    <h4 class="winner-card-h4"><span class="winner-card-winner">${player}</span> HAS WON THE GAME!!<h4>
    <img class="winner-card-gif" src="https://media.giphy.com/media/cOB8cDnKM6eyY/giphy.gif" alt="gif from Billy Madison saying 'I am the smartest man alive!'" >
    <h6 class="winner-card-h4"> It took you ${gameTime[0]} minutes and ${gameTime[1]} seconds to win!</h6>
    <div class="end-of-game-option-div">
      <button class="play-again-button reset-button" id="reset-game-button">RESET GAME</button>
      <button class="play-again-button rematch-button" id="rematch-game-button">REMATCH</button>
    </div
  </div>`;
}

function rematchSetUp(event) {
  if (event.target.classList.contains('rematch-button')) {
    var gameplayParent = document.getElementById('gameplay-parentsection');
    gameplayParent.remove();
    instantiateCardAndDeck(event);
    recreateCardsAtRandom(event);
    getWinnersHistory(event);
    createScoreCard();
    determineTopPLayer();
    player1.resetMatchCount();
    player2.resetMatchCount();
  }

}

function resetGame(event) {
  if (event.target.classList.contains('reset-button')) {
    var gameplayParent = document.getElementById('gameplay-parentsection');
    gameplayParent.remove();
    createPlayerFormHTML();
    createScoreCard();
  }
}

function addWinnerToLS(winner) {
  var winnersToParse = localStorage.getItem("winner");
  winnersFromLS = JSON.parse(winnersToParse);
  var gameTime = getGameTime();
  var newWinner = [{name: winner, time: gameTime}];
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
  if (deck.matches === 5 && player1.matchCount > player2.matchCount) {
    removeCardSection();
    cardSection.innerHTML = createWinnerCard(player1.name);
    addWinnerToLS(player1.name);
  } else if(deck.matches === 5 && player1.matchCount < player2.matchCount) {
    removeCardSection();
    cardSection.innerHTML = createWinnerCard(player2.name);
    addWinnerToLS(player2.name);
  }
}

function removeMatchedCards(event) {
  var cardID = event.target.dataset.id;
  deck.selectedCards.splice(0, 2);
  var cardsToDelete = document.querySelectorAll(`[data-id='${cardID}']`);
  cardsToDelete.forEach(function(card) {
    card.classList.add('hidden');
  });
}

function matchCards(event) {
  if (deck.selectedCards.length === 2 && deck.checkSelectedCards() === true) {
    deck.selectedCards.forEach(function(card) {
      card.match();
    });
    deck.moveToMatched();
    deck.matches ++;
    removeMatchedCards(event);
    updateMatchCount();
    displayWinner();
    changeTurnHighlighter();
  }
}

function flipCard(event) {
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
        if(deck.selectedCards.length === 2) {
          setTimeout(matchCards, 1000, event);
        }
        if(deck.selectedCards.length === 2) {
          setTimeout(flipCardOnTimer, 2000);
        }
      }
  }
}

function changeTurnHighlighter() {
var player1Turn = document.getElementById('player1-turn');
var player2Turn = document.getElementById('player2-turn');
  if (deck.totalGuesses % 2 === 1) {
    player1Turn.classList.remove('player-turn-indicator');
    player2Turn.classList.add('player-turn-indicator');
  } else {
    player2Turn.classList.remove('player-turn-indicator');
    player1Turn.classList.add('player-turn-indicator');
  }
  if(deck.matchedCards.length === 10) {
    player1Turn.classList.remove('player-turn-indicator');
    player2Turn.classList.remove('player-turn-indicator');
  }
}

function flipCardOnTimer() {
  if (deck.selectedCards.length === 2) {
    changeTurnHighlighter();
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
  if ("winner" in localStorage) {
    var scoreBoard = document.getElementById('winner-scoreboard');
    scoreBoard.classList.toggle('hidden');
  }
}

function createScoreCard() {
  if ("winner" in localStorage) {
    var scoreCardHTML = createScoreCardHTML();
    headerParent.insertAdjacentHTML('afterbegin', scoreCardHTML);
  }
}

function givePlayer1Trophy(array, playerName, playerText) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === playerName.name) {
      playerText.innerText += '  🏆';
      return;
    }
  }
}

function determineTopPLayer() {
  if ("winner" in localStorage) {
    if (event.target.classList.contains('instruction-playgame-button') ||
        event.target.classList.contains('rematch-button')) {
      var player1Text = document.getElementById('player1-turn');
      var player2Text = document.getElementById('player2-turn');
      var winnersArray = arrangeWinnersFromLS();
      winnersArray.splice(5, 100);
      givePlayer1Trophy(winnersArray, player1, player1Text);
      givePlayer1Trophy(winnersArray, player2, player2Text);
    }
  }
}

function arrangeWinnersFromLS() {
  if ("winner" in localStorage) {
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

function shuffleImagesForGameplay() {
  deck.shuffle(deck.cards);
  deck.cards.splice(0, 5);
  var cardsForGameplay = [];
  for (var i = 0; i < deck.cards.length; i++) {
    var card = new Card(deck.cards[i].matchInfo, deck.cards[i].name + 1);
    cardsForGameplay.push(card);
  }
  deck.cards = deck.cards.concat(cardsForGameplay);
  deck.shuffle(deck.cards);
}

function removeInstructionParent(event  ) {
  if(event.target.classList.contains('instruction-playgame-button')) {
    var instructionParentSection = document.getElementById('main-instruction-parentsection');
    instructionParentSection.remove();
  }
}

function createPlayerHistoryHTML(array) {
  playerHistoryHTML = '';
  if (array.length > 0) {
    for (var i = 0; i < array.length; i++) {
      playerHistoryHTML += `
      <div class="player-history-div">
        <p>${array[i].name}</p>
        <p>${array[i].time[0]}m - ${array[i].time[1]}s</p>
      </div>
      `
    }
  }
  return playerHistoryHTML;
}

function getPLayerHistory(array, player) {
  playerHistoryWins = array.filter(function(winner) {
    return winner.name === player.name
  });
  return playerHistoryWins
}

function getWinnersHistory(event) {
  if ("winner" in localStorage) {
    if (event.target.classList.contains('instruction-playgame-button') ||
        event.target.classList.contains('rematch-button')) {
      var player1HistoryParent = document.getElementById('player1-history');
      var player2HistoryParent = document.getElementById('player2-history');
      var winners = arrangeWinnersFromLS();
      var player1History = getPLayerHistory(winners, player1);
      var player2History = getPLayerHistory(winners, player2);
      var player1HistoryHTML = createPlayerHistoryHTML(player1History);
      var player2HistoryHTML = createPlayerHistoryHTML(player2History);
      player1HistoryParent.insertAdjacentHTML('beforeend', player1HistoryHTML);
      player2HistoryParent.insertAdjacentHTML('beforeend', player2HistoryHTML);
    }
  }
}

function recreateCardsAtRandom(event) {
  if (event.target.classList.contains('instruction-playgame-button') ||
      event.target.classList.contains('rematch-button')) {
    shuffleImagesForGameplay();
    getStartTime();
    mainParent.innerHTML = `
    <section class="main-gameplay-parentsection" id="gameplay-parentsection">
      <aside class="gameplay-player-info-section">
        <div class="player-info-name">
          <p class="player-info-text player-turn-indicator" id="player1-turn"><span>${player1.name}</span></p>
        </div>
        <div class="player-info-matches">
          <p class="player-info-matches-text">MATCHES THIS ROUND</p>
          <p><span class="player-info-matches-num" id="player1-matches">0</span></p>
        </div>
        <div class="player-info-games-won" id="player1-history">
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
          <p class="player-info-text" id="player2-turn"><span>${player2.name}</span></p>
        </div>
        <div class="player-info-matches">
          <p class="player-info-matches-text">MATCHES THIS ROUND</p>
          <p><span class="player-info-matches-num" id="player2-matches">0</span></p>
        </div>
        <div class="player-info-games-won" id="player2-history">
          <p class="player-info-text"> GAME WINS</p>
        </div>
      </aside>
    </section>`;
  }
}
