var xScore = 0;
var oScore = 0;
var turn = "X";
var ai = 0;
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var timer1 = 10;
var timer2 = 120;
var xArray = [];
var oArray = [];
var xo = 0;

function changeTurn() {
	if (turn == "X") {
		turn = "O";
		document.getElementById('playerId').innerHTML = "O";
	}
	else if (turn == "O") { turn = "X"; document.getElementById('playerId').innerHTML = "X"; }
	else { alert("error!"); }
	timer1 = 10;
	document.getElementById("timer").innerHTML = timer1;
	timer2 = 120;
}

function newGame() {
	turn = "X";
	board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	xArray = [];
	oArray = [];
	document.getElementById('playerId').innerHTML = "X";
	document.getElementById('1').innerHTML = "";
	document.getElementById('2').innerHTML = "";
	document.getElementById('3').innerHTML = "";
	document.getElementById('4').innerHTML = "";
	document.getElementById('5').innerHTML = "";
	document.getElementById('6').innerHTML = "";
	document.getElementById('7').innerHTML = "";
	document.getElementById('8').innerHTML = "";
	document.getElementById('9').innerHTML = "";
	timer1 = 10;
	document.getElementById("timer").innerHTML = timer1;
	timer2 = 120;
}

function reset() {
	newGame()
	xScore = 0;
	oScore = 0;
	document.getElementById('xscore').innerHTML = xScore;
	document.getElementById('oscore').innerHTML = oScore;
}

function updateScore() {
	console.log("updateScore");
	if (turn == "X") {
		xScore += 1;
		document.getElementById('xscore').innerHTML = xScore;
	}
	else if (turn == "O") {
		oScore++;
		document.getElementById('oscore').innerHTML = oScore;
	}
}

function removeXO() {
	xo--;
	if (turn == "X") { var tmp = xArray.shift(); }
	else if (turn == "O") { var tmp = oArray.shift(); }

	document.getElementById((tmp + 1).toString()).innerHTML = "";
	board[tmp] = 0;
}

function pushArray(id) {
	xo++;
	if (turn == "X") { if (xArray.push(id - 1) > 4) { removeXO(); } else console.log("X: " + xArray); }
	else if (turn == "O") { if (oArray.push(id - 1) > 4) { removeXO(); } else console.log("O: " + oArray); }
}

function aiPlay() {
	if (turn == "O") {
		if (xo === 8) {
			t = board.indexOf(0);
			console.log("index: " + t); //print
			document.getElementById(t + 1).innerHTML = turn;
			board[t] = turn;
			pushArray(t + 1);
			console.log(board);
			if (!endGameDetector()) changeTurn();
		} else {
			var bool = true;
			var counts = 0;
			while (bool) {
				var r = Math.floor(Math.random() * 9);
				var id = r + 1;
				counts++;
				console.log(counts + ": " + r);
				if (counts > 20) { alert("error"); break }
				if (board[r] === 0) {
					document.getElementById(id).innerHTML = turn;
					board[r] = turn;
					pushArray(id);
					console.log(board);
					if (!endGameDetector()) changeTurn();
					else newGame();
					bool = false;
				}
			}
		}
	}

}

function insertXO(id) {
	if (board[id - 1] != 0) {
		alert("This spot is already taken!");
	}
	else if (ai === 0) {
		document.getElementById(id).innerHTML = turn;
		board[id - 1] = turn;
		pushArray(id);
		console.log(board);
		// if (!endGameDetector()) changeTurn();

		setTimeout(() => { if (!endGameDetector()) changeTurn(); }, 1);
	}
	else { // AI playing
		document.getElementById(id).innerHTML = turn;
		board[id - 1] = turn;
		pushArray(id);
		if (!endGameDetector()) changeTurn();
		// setTimeout(() => { if (!endGameDetector()) changeTurn(); }, 1);
		aiPlay();
		// if (!endGameDetector()) changeTurn();
		// setTimeout(() => { if (!endGameDetector()) changeTurn(); }, 1);
		// changeTurn();

	}
}

function timer() {
	function count() {
		if (timer1 === 0) {
			alert("Time's up! Skip player " + turn + "'s turn");
			changeTurn();
			if (turn === "O" && ai === 1) aiPlay();
		}
		else if (timer2 === 0) {
			alert("Time's up! A new game will be started"); newGame();
		}
		else {
			document.getElementById("timer").innerHTML = timer1;
			timer1--;
			timer2--;
		}
	}
}

function aiToggle() {
	if (ai == 0) {
		ai = 1;
		document.body.style.backgroundColor = "lightgreen";
		document.getElementById("aiMode").innerHTML = "O";
		if (turn == "O") aiPlay();
	}
	else if (ai == 1) {
		ai = 0;
		document.body.style.backgroundColor = "#87cefa";
		document.getElementById("aiMode").innerHTML = "X";
	}
}

function endGameDetector() {
	if ((board[0] == turn && board[1] == turn && board[2] == turn) ||
		(board[3] == turn && board[4] == turn && board[5] == turn) ||
		(board[6] == turn && board[7] == turn && board[8] == turn) ||
		(board[0] == turn && board[3] == turn && board[6] == turn) ||
		(board[1] == turn && board[4] == turn && board[7] == turn) ||
		(board[2] == turn && board[5] == turn && board[8] == turn) ||
		(board[0] == turn && board[4] == turn && board[8] == turn) ||
		(board[2] == turn && board[4] == turn && board[6] == turn)) {
		alert("Player " + turn + " wins!");
		updateScore();
		newGame();
		return true;
	}
	else if (board.includes(0)) return false;
	else { alert('The game is tied!'); newGame(); return true; }
}