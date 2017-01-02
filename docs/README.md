# Stick Tennis

[Live](http://www.wesleyrobinson.me/stick-tennis)

## Background

Stick tennis is a clone of the classic Atari Pong Game. Try to get the ball past your opponents stick 11 times before he does!

## Functionality and MVP

Users will be able to:

* [ ] See the score at the top of the page
* [ ] Control their stick with the arrow keys
* [ ] Play against a computer
* [ ] Continually replay as many times as they want

In addition, this project will include:

* [ ] A production README

## Wireframes

This app will consist of two screens. An entry screen which prompts the user to continue on to the game, which holds links to my github and linkedin, and the actual game screen. The player paddle will be controlled with the up and down arrow keys.

Entry screen:
![Alt text](assets/images/entry_screen.jpg)

Game screen:
![Alt text](assets/images/game_screen.jpg)

## Architecture and Technologies

This project will implement the following technologies:

- Vanilla JavaScript and jQuery for overall structure and game logic
- Easel.js with HTML5 Canvas for DOM manipulation and rendering
- Webpack to bundle and serve up the various scripts

In addition to the webpack entry file, there will be three scripts involved in this project:

- computer.js: this script will handle logic for the computer player
- ball.js: this script will handle ball logic, including speeds and trajectory
- paddle.js: will handle some of the trajectory logic
- game.js: will handle the game logic
- court.js: will handle the rendering of the playing court

## Implementation Timeline

**Day 1:** Setup all necessary Node modules, including getting webpack up and running and Easel.js installed. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all 3 scripts outlined above. Learn the basics of Easel.js. Goals for the day:

- get webpack to run error-free
- Learn enough Easel.js to render objects on the page

**Day 2:** Dedicate this day to learning the Easel.js API. First, build out the ball and paddle objects to render on the court. Then, use court.js to create and render at least the square playing area. Build in the ability to move the paddles. Goals for the day:

- Complete the ball.js module (constructor, update functions)
- Render a court on the Canvas using Easel.js
- Make the paddle moveable on arrow key presses
- Make the ball moveable
- Research the math behind the ball bouncing off of the paddles

**Day 3:** Create the backend logic.  Build out the functionality to redirect the ball and trajectory logic.

- Complete game.js
- Have a functional game that can be played
- Enter screen

**Day 4:** Polish
- Complete styling and game logic, making sure they work as expected
- Include links to github and linkedin on enter screen

## Bonus Features

* [ ] Add options for other difficulties, toggling ball speed and computer speed
# stick-tennis
# stick-tennis
# stick-tennis
