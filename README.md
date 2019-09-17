# Mod-1 Solo Project - Memory Card Game


## Table of Contents

* [General Info](#General Info)
* [Background](#Background)
* [Built With](#Built-With)
* [Screenshots](#Screenshots)
* [How to Use](#How-to-Use)
* [Features](#Features)
* [Setup](#Setup)
* [License](#License)

## General Info

<img src="images/number-guesser-logo.png" alt="Number Guesser Logo">

The purpose for this project was to practice HTML, CSS, and JavaScript for the Front-End Engineering course at Turing during Module 1.

## Background

For this project, we were given a static comp that we had to recreate using HTML and CSS.  We were then given a list of behaviors that the site was expected to have in order for the game to follow a set of rules.  See the comp <a href="https://frontend.turing.io/assets/images/projects/number-guesser/week2-numberguesser-01.jpg">here</a>.

Behaviors:

- Users must be able to define a range for their guess using the max and min fields. Update button must update the listed range, and must not work when either input contains a non-numerical value, and must show an error if the max is smaller than the min.

- A random number must be generated when the update button is clicked.

- Each player must have an input field for adding their name and their guess. Clicking the submit button will add each player name and guess to a cards below them.  The submit button will not work if the forms aren't filled out, and an error is displayed if a field is blank or if a guess falls outside the specified range.

- The score cards must populate with the names and guesses entered into the fields and submitted. If the player's guess is below the randomly chosen number, the score card must indicate that the guess is too low.  If the guess higher than the randomly chosen number, the score card must indicate that the guess is too high.

- If a player guesses the randomly chosen number, the scorecard must indicate that the user won.  When a player wins, a winner card displays on the right.  The range is automatically expanded by 10 on each side, unless the min is already below 10.

- The clear guess button must clear the name and guess fields.  The reset button must clear the whole game and generate a new random number.

- As players continue to win, new cards must appear to the right.  The x button on each card must make the card disappear.

- The site must be responsive down to a width of 320px.

## Built-With

- HTML5
- CSS3
- JavaScript

## Screenshots

<img src="images/minmax-error-state.png" alt="Min/Max error state">
<img src="images/guess-error-state.png" alt="Guess error state">
<img src="images/winner-display.png" alt="Winner Display">

## How-to-Use

- Set the range for the random number to fall within.  A random number will be generated when you click 'update.'
- Fill out your name and your guess in the indicated forms.  Click submit.
- The score cards will tell you if your guess is too high or too low.  Clear your guesses, adjust what you think the number is based on the feedback, and click submit again.
- Once a correct guess has been made, reset the game to expand the range.  Start guessing again!

## Features

- [x] Altering page content via input field (JS)
- [x] Responsive (CSS Media Query for navigation and page columns)
- [x] Generating random number through JS, comparison of number to inputs


## Setup

Access the site <a href="https://adamsjr8576.github.io/Project2_NumberGuesser/">here.</a>

## License

Credit for project specs and web design goes to Turing School of Software and Design.
