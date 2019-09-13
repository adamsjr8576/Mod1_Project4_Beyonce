var player1NameInput = document.getElementById('player1-name-input');
var playGameButton1 = document.getElementById('intro-playgame-button');
var introParentSection = document.getElementById('main-intro-parentsection');
var mainParent = document.getElementById('main-parent');
var introErrorMessage = document.getElementById('introform-error-message');

mainParent.addEventListener('click', clickInMain);

function clickInMain() {
  moveToGameplayPage();
  makeErrorIfNoName()
}

function makeErrorIfNoName() {
  if (event.target.classList.contains('intro-playgame-button')) {
    if (player1NameInput.value === "") {
      player1NameInput.classList.add('error-state');
      introErrorMessage.classList.add('introform-no-input-error');
      introErrorMessage.innerHTML = "PLEASE ENTER YOUR NAME!!!"
    } else {
      moveToInstructionPage();
    }
  }
}

function moveToInstructionPage() {
  introParentSection.remove();
  mainParent.innerHTML = `
    <section class="main-instruction-section" id="main-instruction-parentsection">
      <h2 class="instruction-section-header">WELCOME <span>${player1NameInput.value}</span> and <span>PLAYER 2 NAME</span>!</h2>
      <p class="instruction-section-paragraph">The goal of the game is to find all 5 pairs of cards as quickly as possible.
      The player that finds the greatest numbers of pairs, wins.</p>
      <p class="instruction-section-paragraph">To begin playing, the player whose name is highlighted can click any card in the card
      pile. It will flip over and reveal a picture of Beyonce. Click another card. If they match, they will disappear and you will
      have completed a match! If they don't, you'll have three seconds to look at them before they flip back over. Then it's time
      for the other player to try!</p>
      <p class="instruction-section-paragraph">After youy play, you'll see the name of the final winnner and how long it took to
      win the game.</p>
      <button class="playgame-button instruction-playgame-button" id="instruction-playgame-button">PLAY GAME </button>
    </section>`;
}

function moveToGameplayPage() {
  if (event.target.classList.contains('instruction-playgame-button')) {
  var playGameButton2 = document.getElementById('instruction-playgame-button');
  var instructionParentSection = document.getElementById('main-instruction-parentsection');
  instructionParentSection.remove();
  mainParent.innerHTML = `
  <section class="main-gameplay-parentsection">
    <aside class="gameplay-player-info-section">
      <div class="player-info-name">
        <p class="player-info-text"><span>PLAYER 1 NAME</span></p>
      </div>
      <div class="player-info-matches">
        <p class="player-info-matches-text">MATCHES THIS ROUND</p>
        <p><span class="player-info-matches-num">0</span></p>
      </div>
      <div class="player-info-games-won">
        <p class="player-info-text"> GAME WINS</p>
      </div>
    </aside>
    <section class="gameplay-card-section">
      <div class="gameplay-card-div">
        <div class="gameply-card position1">B</div>
        <div class="gameply-card position2">B</div>
        <div class="gameply-card position3">B</div>
      </div>
      <div class="gameplay-card-div">
        <div class="gameply-card position4">B</div>
        <div class="gameply-card position5">B</div>
        <div class="gameply-card position6">B</div>
        <div class="gameply-card position7">B</div>
      </div>
      <div class="gameplay-card-div">
        <div class="gameply-card position8">B</div>
        <div class="gameply-card position9">B</div>
        <div class="gameply-card position10">B</div>
      </div>
    </section>
    <aside class="gameplay-player-info-section">
      <div class="player-info-name">
        <p class="player-info-text"><span>PLAYER 1 NAME</span></p>
      </div>
      <div class="player-info-matches">
        <p class="player-info-matches-text">MATCHES THIS ROUND</p>
        <p><span class="player-info-matches-num">0</span></p>
      </div>
      <div class="player-info-games-won">
        <p class="player-info-text"> GAME WINS</p>
      </div>
    </aside>
  </section>`;
  }
}
