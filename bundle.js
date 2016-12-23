/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById('game-canvas');
	  var width = 900;
	  var height = 600;
	  canvas.width = width;
	  canvas.height = height;
	  var ctx = canvas.getContext('2d');
	
	  var game = new Game(ctx, width, height);
	  game.startGame();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ball = __webpack_require__(2);
	var Paddle = __webpack_require__(3);
	var Player = __webpack_require__(4);
	var Computer = __webpack_require__(5);
	
	var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	  window.setTimeout(callback, 1000 / 60);
	};
	
	var Game = function () {
	  function Game(ctx, width, height) {
	    _classCallCheck(this, Game);
	
	    this.ctx = ctx;
	    this.width = width;
	    this.height = height;
	    this.ball = new Ball(ctx, this, this.width / 2, this.height / 2);
	    this.player = new Player(ctx, this.width - 31, this.height / 2 - 60);
	    this.computer = new Computer(ctx, 11, this.height / 2 - 60);
	    this.playerScore = 0;
	    this.computerScore = 0;
	  }
	
	  _createClass(Game, [{
	    key: 'startGame',
	    value: function startGame() {
	      $('.title').html('');
	      $('.new-game-title').html('Welcome to Stick Tennis');
	      $('.new-game-instructions').html('Use the up and down arrow keys to control your stick (right side)');
	      $('.continue').html("(Click here to continue)");
	
	      $('.new-game-box').on('click', this.start.bind(this));
	    }
	  }, {
	    key: 'endGame',
	    value: function endGame() {
	      var message = void 0;
	
	      if (this.playerScore === 11) {
	        message = "You won!";
	      } else {
	        message = "You lost.";
	        $('.end-game').css('color', 'red');
	      }
	      $('.end-game').html('Game Over. ' + message);
	      $('.retry').html('Play again?');
	      $('.retry').css('border', '1px solid #fff');
	      $('.retry').css('cursor', 'pointer');
	
	      $('.retry').on('click', this.reset.bind(this));
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      $('.new-game-title').html("");
	      $('.new-game-instructions').html("");
	      $('.continue').html("");
	      $('.new-game-box').css('border', 'none');
	      $('.new-game-box').off('click');
	      $('.new-game-box').css('cursor', 'auto');
	      $('.title').html('Stick Tennis');
	      $('#game-canvas').css('border', '1px solid #fff');
	      this.animateId = animate(this.step.bind(this));
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.update();
	      this.render();
	      if (this.playerScore === 11 || this.computerScore === 11) {
	        this.endGame();
	      } else {
	        animate(this.step.bind(this));
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.ball.update(this.player.paddle, this.computer.paddle);
	      this.computer.update(this.ball);
	      this.player.update();
	    }
	  }, {
	    key: 'centerLine',
	    value: function centerLine() {
	      this.ctx.beginPath();
	      this.ctx.setLineDash([5, 15]);
	      this.ctx.moveTo(this.width / 2, 0);
	      this.ctx.lineTo(this.width / 2, this.height);
	      this.ctx.closePath();
	      this.ctx.strokeStyle = '#fff';
	      this.ctx.stroke();
	    }
	  }, {
	    key: 'score',
	    value: function score() {
	      this.ctx.font = 'bold 50px Orbitron';
	      this.ctx.fillStyle = '#7f7f7f';
	      this.ctx.fillText(this.playerScore, this.width / 2 + 30, 70);
	      this.ctx.fillText(this.computerScore, this.width / 2 - 30 - 40, 70);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.ctx.fillStyle = "#093c1c";
	      this.ctx.fillRect(0, 0, this.width, this.height);
	      this.centerLine();
	      this.score();
	      this.ball.render();
	      this.player.render();
	      this.computer.render();
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      $('.end-game').html('');
	      $('.retry').html('');
	      $('.retry').css('border', 'none');
	      $('.retry').css('cursor', 'auto');
	      $('.retry').off('click');
	
	      this.ball.reset();
	      this.player.reset();
	      this.computer.reset();
	      this.playerScore = 0;
	      this.computerScore = 0;
	      window.cancelAnimationFrame(this.animateId);
	      this.start();
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ball = function () {
	  function Ball(ctx, game, x, y) {
	    _classCallCheck(this, Ball);
	
	    this.x = x;
	    this.y = y;
	    this.game = game;
	    this.ctx = ctx;
	    this.xSpeed = -12;
	    this.ySpeed = 2;
	    this.radius = 12;
	  }
	
	  _createClass(Ball, [{
	    key: 'render',
	    value: function render() {
	      this.ctx.beginPath();
	      this.ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	      this.ctx.fillStyle = '#00ffa5';
	      this.ctx.fill();
	    }
	  }, {
	    key: 'update',
	    value: function update(playerPaddle, computerPaddle) {
	      var _this = this;
	
	      this.x += this.xSpeed;
	      this.y += this.ySpeed;
	
	      var intLine = false;
	      var xLeft = this.x - this.radius;
	      var xRight = this.x + this.radius;
	      var yTop = this.y - this.radius;
	      var yBottom = this.y + this.radius;
	
	      if (yTop < 0) {
	        this.y = 12;
	        this.ySpeed = -this.ySpeed;
	      } else if (yBottom > this.game.height) {
	        this.y = this.game.height - this.radius;
	        this.ySpeed = -this.ySpeed;
	      } else if (xRight > this.game.width || xLeft < 0) {
	        (function () {
	          var oldXSpeed = -_this.xSpeed;
	          var oldYSpeed = -_this.ySpeed;
	          _this.xSpeed = 0;
	          _this.ySpeed = 0;
	          _this.x = _this.game.width / 2;
	          _this.y = _this.game.height / 2;
	          xRight > _this.game.width ? _this.game.computerScore += 1 : _this.game.playerScore += 1;
	          window.setTimeout(function () {
	            _this.xSpeed = oldXSpeed;
	            _this.ySpeed = oldYSpeed / 3;
	          }, 500);
	        })();
	      }
	
	      if (xRight > playerPaddle.x && xRight < playerPaddle.x + 12 && yBottom > playerPaddle.y && yTop < playerPaddle.y + playerPaddle.height || xLeft < computerPaddle.x + computerPaddle.width && xLeft > computerPaddle.x + computerPaddle.width - 12 && yBottom > computerPaddle.y && yTop < computerPaddle.y + computerPaddle.height) {
	        var maxAngle = 3 * Math.PI / 12;
	        var paddle = this.x < this.game.width / 2 ? computerPaddle : playerPaddle;
	        var relIntY = paddle.y + paddle.height / 2 - this.y;
	        var normalized = relIntY / (paddle.height / 2);
	        var bounceAngle = normalized * maxAngle;
	        var direction = this.xSpeed > 0 ? -1 : 1;
	
	        if (relIntY < 5 && relIntY > -5) {
	          this.xSpeed = -this.xSpeed;
	          this.ySpeed = -this.ySpeed;
	        } else {
	          this.xSpeed = direction * 12 * Math.cos(bounceAngle);
	          this.ySpeed = 12 * -Math.sin(bounceAngle);
	        }
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.x = this.game.width / 2;
	      this.y = this.game.height / 2;
	      this.xSpeed = -12;
	      this.ySpeed = 2;
	    }
	  }]);
	
	  return Ball;
	}();
	
	module.exports = Ball;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Paddle = function () {
	  function Paddle(ctx, x, y, width, height) {
	    _classCallCheck(this, Paddle);
	
	    this.ctx = ctx;
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	  }
	
	  _createClass(Paddle, [{
	    key: 'render',
	    value: function render() {
	      this.ctx.fillStyle = '#7f7f7f';
	      this.ctx.fillRect(this.x, this.y, this.width, this.height);
	    }
	  }, {
	    key: 'move',
	    value: function move(y) {
	      this.y += y;
	
	      if (this.y + this.height > 600) {
	        this.y = 600 - this.height;
	      } else if (this.y < 0) {
	        this.y = 0;
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.y = 300 - this.height / 2;
	      this.x = this.x;
	    }
	  }]);
	
	  return Paddle;
	}();
	
	module.exports = Paddle;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Paddle = __webpack_require__(3);
	
	var Player = function () {
	  function Player(ctx, x, y) {
	    _classCallCheck(this, Player);
	
	    this.ctx = ctx;
	    this.x = x;
	    this.y = y;
	    this.paddle = new Paddle(ctx, x, y, 20, 120);
	  }
	
	  _createClass(Player, [{
	    key: 'render',
	    value: function render() {
	      this.paddle.render();
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var _this = this;
	
	      key.getPressedKeyCodes().forEach(function (code) {
	        if (code === 40) {
	          _this.paddle.move(5);
	        } else if (code === 38) {
	          _this.paddle.move(-5);
	        }
	      });
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.paddle.reset();
	    }
	  }]);
	
	  return Player;
	}();
	
	module.exports = Player;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Paddle = __webpack_require__(3);
	var Ball = __webpack_require__(2);
	
	var Computer = function () {
	  function Computer(ctx, x, y, ball) {
	    _classCallCheck(this, Computer);
	
	    this.ctx = ctx;
	    this.x = x;
	    this.y = y;
	    this.paddle = new Paddle(ctx, x, y, 20, 120);
	  }
	
	  _createClass(Computer, [{
	    key: 'render',
	    value: function render() {
	      this.paddle.render();
	    }
	  }, {
	    key: 'update',
	    value: function update(ball) {
	      var diff = ball.y - (this.paddle.y + this.paddle.height / 2);
	
	      if (diff > 5) {
	        this.paddle.move(5);
	      } else if (diff < -5) {
	        this.paddle.move(-5);
	      } else if (ball.ySpeed < 5 && ball.ySpeed > -5 && (diff < 5 || diff > -5)) {
	        this.paddle.move(ball.ySpeed);
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.paddle.reset();
	    }
	  }]);
	
	  return Computer;
	}();
	
	module.exports = Computer;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map