// TIC TAC TOE
// by Marine Lou

// FOUNDATIONS
const winCombos = [['Aa', 'Ab', 'Ac'], ['Ba', 'Bb', 'Bc'], ['Ca', 'Cb', 'Cc'], ['Aa', 'Ba', 'Ca'], ['Ab', 'Bb', 'Cb'], ['Ac', 'Bc', 'Cc'], ['Ac', 'Bb', 'Ca'], ['Aa', 'Bb', 'Cc']];
const whoseTurn = ['Choose Play Mode', 'Player A: Your Turn', 'Player B: Your Turn', 'Wait Bot playing'];
const ending = ['Player A: You Won', 'Player B: You Won', 'Draw: No Winner'];
let signDivs = ['Aa', 'Ab', 'Ac', 'Ba', 'Bb', 'Bc', 'Ca', 'Cb', 'Cc'];
let playerArray = [[], []];
let playerTurn = [0, 0];
let winDivs = [];
let endGame = false;
let playMode = false;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// LET THE PLAY BEGIN
function playBeginning() {
    document.getElementById('playBtn').classList.add('dNone')
    document.getElementById('playersBtn').classList.remove('dNone')
    document.getElementById('whoseTurn').classList.remove('dNone')
    document.getElementById('whoseTurn').innerHTML = whoseTurn[0]
    let signs = document.getElementsByClassName('signs')
    for (let i = 0; i < signs.length; i++) {
        signs[i].classList.add('dNone')
    }
}

// LET THE PLAY RE - BEGIN
function replay() {
    signDivs = ['Aa', 'Ab', 'Ac', 'Ba', 'Bb', 'Bc', 'Ca', 'Cb', 'Cc'];
    playerArray = [[], []];
    playerTurn = [0, 0];
    endGame = false;
    playMode = false;
    document.getElementById('replayBtn').classList.add('dNone')
    document.getElementById('playersBtn').classList.remove('dNone')
    document.getElementById('whoseTurn').classList.remove('dNone')
    for (let i=0; i<winDivs.length; i++) {
        document.getElementById(winDivs[i]).classList.remove('bgYellow')
    }
    winDivs = [];
    document.getElementById('whoseTurn').classList.remove('colorYellow')
    document.getElementById('whoseTurn').innerHTML = whoseTurn[0]
    let signs = document.getElementsByClassName('signs')
    for (let i = 0; i < signs.length; i++) {
        signs[i].classList.add('dNone')
        signs[i].classList.remove('disabled')
    }
}

// PLAY MODE
function soloPlay() {
    document.getElementById('playersBtn').classList.add('dNone')
    document.getElementById('whoseTurn').innerHTML = whoseTurn[1]
    let signsDivs = document.getElementsByClassName('gridDiv')
    for (let i = 0; i < signsDivs.length; i++) {
        signsDivs[i].classList.remove('disabled')
    }
    playMode = false
}

function duoPlay() {
    document.getElementById('playersBtn').classList.add('dNone')
    document.getElementById('whoseTurn').innerHTML = whoseTurn[1]
    let signsDivs = document.getElementsByClassName('gridDiv')
    for (let i = 0; i < signsDivs.length; i++) {
        signsDivs[i].classList.remove('disabled')
    }
    playMode = true
}

// PLAY
function play(element) {
    if (endGame === false) {
        if (playerTurn[0] <= playerTurn[1]) {
            // PLAYER A
            playerTurn[0] = playerTurn[0] + 1
            let signPlace = element.getAttribute('id')
            playerArray[0].push(signPlace)
            for (let i = 0; i < signDivs.length; i++) {
                if (signPlace === signDivs[i]) {
                    signDivs.splice(i, 1)
                    break
                }
            }

            addCross(element)
            element.classList.add('disabled')
            checkIfWin(0)
            if (endGame === false) {
                if (playMode === true) {
                    document.getElementById('whoseTurn').innerHTML = whoseTurn[2]
                } else {
                    document.getElementById('whoseTurn').innerHTML = whoseTurn[3]
                    sleep(1000).then(() => {
                        botPlay()
                    })
                }
            }

        } else if (playerTurn[1] < playerTurn[0] && playMode === true) {
            // PLAYER B
            playerTurn[1] = playerTurn[1] + 1
            let signPlace = element.getAttribute('id')
            playerArray[1].push(signPlace)

            addRing(element)
            element.classList.add('disabled')
            checkIfWin(1)
            if (endGame === false) {
                document.getElementById('whoseTurn').innerHTML = whoseTurn[1]
            }
        }
    }
}

// RANDOM PLAYER
function botPlay() {
    playerTurn[1] = playerTurn[1] + 1
    let randomDiv = parseInt(randomNumber(0, (signDivs.length - 1)))
    let signID = signDivs[randomDiv]
    playerArray[1].push(signDivs[randomDiv])
    signDivs.splice(randomDiv, 1)
    let signDiv = document.getElementById(signID)

    addRing(signDiv)
    signDiv.classList.add('disabled')
    checkIfWin(1)
    if (endGame === false) {
        document.getElementById('whoseTurn').innerHTML = whoseTurn[1]
    }
}

// SIGNS
function addCross(element) {
    let img = document.createElement('img');
    img.src = 'assets/img/tic-tac-toe_x.png'
    img.alt = 'cross'
    img.title = 'cross'
    img.classList.add('signs')
    element.appendChild(img)

}

function addRing(element) {
    let img = document.createElement('img');
    img.src = 'assets/img/tic-tac-toe_o.png'
    img.alt = 'ring'
    img.title = 'ring'
    img.classList.add('signs')
    element.appendChild(img)
}

//CHECKING
function checkIfWin(element) {
    let otherPlayer = 0
    if (playerTurn[element] >= 3) {
        for (let i = 0; i < winCombos.length; i++) {
            let count = 0
            winDivs = []
            for (let j = 0; j < winCombos[i].length; j++) {
                if (playerArray[element].indexOf(winCombos[i][j]) !== -1) {
                    count++
                    winDivs.push(winCombos[i][j])
                    if (count === 3) {
                        playerWin(element)
                        return
                    }
                }
            }
        }
        if (element === 0) {
            otherPlayer = 1
        }
        if ((playerArray[element].length + playerArray[otherPlayer].length) === 9) {
            noWinner(3)
        }
    }
}

// WINNING
function playerWin(element) {
    for (let i=0; i<winDivs.length; i++) {
        document.getElementById(winDivs[i]).classList.add('bgYellow')
    }
    document.getElementById('whoseTurn').classList.add('colorYellow')
    document.getElementById('replayBtn').classList.remove('dNone')
    document.getElementById('whoseTurn').innerHTML = ending[element]
    let signsDivs = document.getElementsByClassName('gridDiv')
    for (let i = 0; i < signsDivs.length; i++) {
        signsDivs[i].classList.add('disabled')
    }
    endGame = true
}

function noWinner() {
    document.getElementById('whoseTurn').innerHTML = ending[2]
    document.getElementById('whoseTurn').classList.add('colorYellow')
    document.getElementById('replayBtn').classList.remove('dNone')
    endGame = true
}