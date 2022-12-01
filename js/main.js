const cards = document.querySelectorAll('.card__inner');
const userScoreBox = document.querySelector('.score__user-score');
const userScoreBox2 = document.querySelector('.popup__text--score');
const userHighScoreBox = document.querySelector('.score__user-highscore');
const userHighScoreBox2 = document.querySelector('.popup__text--hihgscore');
const againBtn = document.querySelector('.AgainBtn');
const popup = document.querySelector('.popup');
let userScore = 0;
let userHighScore = 0;
let secondClikedCard = 0;
let clickCount = 0;
let flippedCardsAmmount = 0;
let matchingCards = [];
let scores = [];

const checkCards = (firstCard, secondCard) => {
	clickCount = 0;

	const firstAlt = firstCard.querySelector('.card__img').alt;
	const secondAlt = secondCard.querySelector('.card__img').alt;
	if (firstAlt == secondAlt) {
		matching(firstCard, secondCard);
		flippedCardsCounter();
	} else {
		unFliped(firstCard, secondCard);
	}
};
const matching = (first, second) => {
	matchingCards.push(first, second);
};

const notClicable = () => {
	cards.forEach((card) => {
		card.style.pointerEvents = 'none';
	});
};
const clicable = () => {
	setTimeout(function () {
		cards.forEach((card) => {
			card.style.pointerEvents = 'all';
		});
		matchingCards.forEach((card) => {
			card.style.pointerEvents = 'none';
		});
	}, 2000);
};

const unFliped = (firstCard, secondCard) => {
	setTimeout(function () {
		firstCard.classList.remove('card__inner--flipped');
		secondCard.classList.remove('card__inner--flipped');
	}, 1000);
	setTimeout(function () {
		firstCard.style.pointerEvents = 'all';
		secondCard.style.pointerEvents = 'all';
	}, 2000);
};

const manageClick = (card) => {
	card.classList.toggle('card__inner--flipped');
	card.style.pointerEvents = 'none';
	clickCount++;
	if (clickCount == 2) {
		notClicable();
		checkCards(card, secondClikedCard);
		addScore();
	}
	clicable();
	secondClikedCard = card;
};

const addScore = () => {
	userScore++;
	userScoreBox.textContent = userScore;
	userScoreBox2.textContent = `Your score: ${userScore}`;
};
const flippedCardsCounter = () => {
	flippedCardsAmmount += 1;
	console.log(flippedCardsAmmount);
	if (flippedCardsAmmount === 10) {
		highscore();
		popup.classList.add('popup--active');
	}
};
const highscore = () => {
	scores.push(userScore);
	userHighScore = scores[0];
	scores.forEach((score) => {
		if (score <= userHighScore) {
			userHighScore = score;
			userHighScoreBox.textContent = userHighScore + 1;
			userHighScoreBox2.textContent = `Your Highsore: ${userHighScore + 1}`;
		}
	});
};

const reset = () => {
	popup.classList.remove('popup--active');
	userScore = 0;
	secondClikedCard = 0;
	clickCount = 0;
	flippedCardsAmmount = 0;
	matchingCards = [];
	userScoreBox.textContent = userScore;
	cards.forEach((card) => {
		card.classList.remove('card__inner--flipped');
		card.style.pointerEvents = 'all';
	});
};

cards.forEach((card) => {
	card.addEventListener('click', () => {
		manageClick(card);
	});
});
againBtn.addEventListener('click', reset);
