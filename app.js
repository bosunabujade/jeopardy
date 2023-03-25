const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

const jeopardyCategories =  [
    {
        genre: "WHO",
        questions: [
            {
                question: "Who stars in the 2002 movie Sweet Home Alabama?",
                answers: ["Reese Witherspoon", "Kate Hudson"],
                correct: "Reese Witherspoon",
                level: "easy"
            },
            {
                question: "Who stars opposite of Lindsay Lohan in the 2006 movie Just My Luck?",
                answers: ["Chris Evans", "Chris Pine"],
                correct: "Chris Pine",
                level: "medium"
            },
            {
                question: "Who stars opposite of Ashton Kutcher in the 2003 movie Just Married?",
                answers: ["Zoe Saldaña", "Brittany Murphy"],
                correct: "Brittany Murphy",
                level: "hard"
            }
        ]
    },
    {
        genre: "WHERE",
        questions: [
            {
                question: "Where does most of the movie Enchanted Take place?",
                answers: ["New York", "Andalasia"],
                correct: "New York",
                level: "easy"
            },
            {
                question: "Where does the movie The Princess Diaries take place?",
                answers: ["Genovia", "San Francisco"],
                correct: "San Francisco",
                level: "medium"
            },
            {
                question: "In the movie What Happens In Vegas Where does the majority of the movie Take place",
                answers: ["New York", "Las Vegas"],
                correct: "New York",
                level: "hard"
            }
        ]
    },
    {
        genre: "WHEN",
        questions: [
            {
                question: "In the 2004 movie 13 going on 30 what year was it at Jenna's 13th birthday party?",
                answers: ["1985", "1987"],
                correct: "1987",
                level: "easy"
            },
            {
                question: "In the movies Bride Wars, Emma and Olivia Have their wedding accidently scheduled on the same day, what day was it?",
                answers: ["June 27th", "June 6th"],
                correct: "June 6th",
                level: "medium"
            },
            {
                question: "Over what holiday does the 2005 movie Just Friends take place",
                answers: ["Christmas", "Thanksgivings"],
                correct: "Christmas",
                level: "hard"
            }
        ]
    },
    {
        genre: "WHAT",
        questions: [
            {
                question: "What school does Viola attend as her brother Sebastian in the movie She's the Man?",
                answers: ["Cornwall Prep", "Illyria Prep"],
                correct: "Illyria Prep",
                level: "easy"
            },
            {
                question: "In the movie John Tucker Must Die, John dates girls from different cliques to hide his multiple realtionships, what cliques does Beth Belong to?",
                answers: ["Overachivers", "Vegan Activist"],
                correct: "Vegan Activist",
                level: "medium"
            },
            {
                question: "In the movie How To Lose A Guy In 10 Days, What magazine does Andie work at?",
                answers: ["Composure Magazine", "Poised Magazine"],
                correct: "Composure Magazine",
                level: "hard"
            }
        ]
    },
    {
        genre: "HOW MANY",
        questions: [
            {
                question: "How many ppossible men could have been Sophie's father in the movie Mamma Mia",
                answers: ["4", "3"],
                correct: "3",
                level: "easy"
            },
            {
                question: "In the movie Two Can Play That Game, Shante has a plan to get her man back in line, how many days does it consist of?",
                answers: ["10 Day Plan", "5 Day Plan"],
                correct: "10 Day Plan",
                level: "medium"
            },
            {
                question: "In the movie The Proposal how many years in prison will Margaret get if the marriage is found to be fraudulent?",
                answers: ["3 Years", "5 years"],
                correct: "5 years",
                level: "hard"
            }
        ]
    }
]

let score = 0;


function addCategory(category) {
    const column = document.createElement("div");
    column.classList.add('genre-column');

    const genreTitle = document.createElement('div');
    genreTitle.classList.add("genre-title");
    genreTitle.innerHTML = category.genre;

    column.append(genreTitle);
    game.append(column);
    
    category.questions.forEach(question => {
        const card = document.createElement('div');
        card.classList.add('card');
        column.append(card);

        if (question.level === "easy") {
            card.innerHTML = 100;
        }
        if (question.level === "medium") {
            card.innerHTML = 200;
        }
        if (question.level === "hard") {
            card.innerHTML = 300;
        }

        card.setAttribute("data-question", question.question);
        card.setAttribute("data-answer-1", question.answers[0]);
        card.setAttribute("data-answer-2", question.answers[1]);
        card.setAttribute("data-correct", question.correct);
        card.setAttribute("data-value", card.getInnerHTML());

        card.addEventListener("click", flipCard);
    })
}

jeopardyCategories.forEach(category => addCategory(category))

function flipCard() {
    this.innerHTML = "";
    this.style.fontSize = "15px";
    this.style.lineHeight = "50px";

    const textDisplay = document.createElement('div');

    textDisplay.classList.add('card-text');
    textDisplay.innerHTML = this.getAttribute('data-question');

    const firstButton = document.createElement('button');
    const secondButton = document.createElement('button');

    firstButton.classList.add('first-button');
    secondButton.classList.add('second-button');
    firstButton.innerHTML = this.getAttribute('data-answer-1');
    secondButton.innerHTML = this.getAttribute('data-answer-2');
    firstButton.addEventListener('click', getResult);
    secondButton.addEventListener('click', getResult);
    this.append(textDisplay, firstButton, secondButton);

    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.removeEventListener('click', flipCard));
}


function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.addEventListener('click', flipCard))

    const cardOfButton = this.parentElement;

    if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute('data-value'));
        scoreDisplay.innerHTML = score;

        cardOfButton.classList.add('correct-answer');
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value');
        }, 100)
    } else {
        cardOfButton.classList.add('wrong-answer');
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        }, 100)
    }

    cardOfButton.removeEventListener('click', flipCard);
}