// Initial Data

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
// pra saber se o jogo ainda tá em andamento:
let playing = false;
// de quem é a vez:
let player = '';
// vencedor:
let warning = '';

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
// evento de click nos itens
document.querySelectorAll('.item').forEach((item) => { // forEach: percorrer todos os itens
    item.addEventListener('click', itemClick);
});
// Functions
function itemClick(event) { //saber qual eu cliquei
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === '') {
        square[item] = player;
        rendeSquare();
        togglePlayer();
    }
};

function reset() {
    warning = '';

    // arredondar o número pra 0 ou 1
    let random = Math.floor(Math.random() * 2);
    // player x Ou o
    player = (random === 0) ? 'x' : 'o';

    for(let i in square) {
        square[i] = '';
    }

    playing = true;

    rendeSquare();
    renderInfo();
}

function rendeSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
       item.innerHTML = square[i];
    }

    checkGame();
};

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.result').innerHTML = warning;
};

// alternar entre a vez do x e do o
function togglePlayer() {
   player = (player === 'x') ? 'o' : 'x';
   renderInfo();
};

// verificação do resultado
function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false; // pausar o game
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
};

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];

    for(let w in pos) {
        let pArray = pos[w].split(','); // a1, a2, c3
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon) {
            return true;
        }
    }

    return false;
};

// verificar o empate
function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

    return true;
};