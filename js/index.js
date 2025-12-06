// SHOW NEXT CARD
function startGame() {
    document.getElementById('introCard').style.display = 'none';
    document.getElementById('gameCard').style.display = 'block';
    initGame();
}

// MEMORY GAME LOGIC
let cards = [];
let first = null;
let second = null;
let lock = false;
let timer;
let matchedPairs = 0;

function initGame() {
    // SYMBOLS INSTEAD OF LETTERS
    let values = ['★', '★', '♥', '♥', '❀', '❀', '✿', '✿'];

    // shuffle
    values.sort(() => Math.random() - 0.5);

    cards = values;
    matchedPairs = 0;

    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';

    cards.forEach((v, i) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.value = v;
        card.onclick = () => reveal(i, card);
        grid.appendChild(card);
    });

    startTimer();
}

function startTimer() {
    let t = 15;
    document.getElementById('timer').innerText = t;
    timer = setInterval(() => {
        t--;
        document.getElementById('timer').innerText = t;
        if (t <= 0) {
            clearInterval(timer);
            initGame();
        }
    }, 1000);
}

function reveal(i, card) {
    if (lock || card.classList.contains('active')) return;

    card.classList.add('active');
    card.innerText = card.dataset.value;

    if (!first) {
        first = card;
    } else {
        second = card;
        lock = true;
        setTimeout(checkMatch, 700);
    }
}

function checkMatch() {
    if (first.dataset.value !== second.dataset.value) {
        first.classList.remove('active');
        second.classList.remove('active');
        first.innerText = '';
        second.innerText = '';
    } else {
        first.classList.add('matched');
        second.classList.add('matched');
        matchedPairs++;
    }

    first = null;
    second = null;
    lock = false;

    if (matchedPairs === 4) {
        clearInterval(timer);
        setTimeout(revealMessage, 500);
    }
}

function revealMessage() {
    const words = ['YOU', 'ARE', 'SO', 'PRETTY', 'MY', 'BABY', 'NURSE', 'IAH'];

    const allCards = document.querySelectorAll('.memory-card');

    allCards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.remove('active', 'matched');
            card.classList.add('active');
            card.innerText = words[i];
        }, i * 200);
    });

    setTimeout(() => {
        document.getElementById('gameCard').style.display = 'none';
        document.getElementById('fiveCardSection').style.display = 'block';
    }, 3000);
}

// FIVE CARDS LOGIC
let fiveActivated = [false, false, false, false, false];

function activateFiveCard(i) {
    if (fiveActivated[i]) return;

    const cards = document.querySelectorAll('.five-card');
    const card = cards[i];
    const heartIcon = card.querySelector('.heart-icon');
    const message = card.querySelector('.five-message');

    card.classList.add('active');
    heartIcon.innerText = '♥';
    message.style.display = 'block';
    fiveActivated[i] = true;

    if (fiveActivated.every(v => v)) {
        setTimeout(() => {
            document.getElementById('openLetterBtn').style.display = 'block';
        }, 500);
    }
}

function openLetter() {
    document.getElementById('fiveCardSection').style.display = 'none';
    document.getElementById('letterCard').style.display = 'block';
}