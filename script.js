let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2
    },
    {
        "question": "Wie stellt man Text am BESTEN fett dar?",
        "answer_1": "&lt;strong&gt;",
        "answer_2": "CSS nutzen",
        "answer_3": "&lt;bold&gt;",
        "answer_4": "&lt;b&gt;",
        "right_answer": 1
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribute title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4
    }
];

let currentQuestion = 0;
let rightAnswerCount = 0;


let AUDIO_RIGHT = new Audio('./assets/sounds/sound_right.wav');
let AUDIO_WRONG = new Audio('./assets/sounds/sound_wrong.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('currentQuestion').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let selectedAnswer = selection.slice(-1);
    let rightAnswer = questions[currentQuestion]['right_answer'];
    let idOfRightAnswer = `answer_${rightAnswer}`;

    if (selectedAnswer == rightAnswer) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_RIGHT.play();
        rightAnswerCount++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_WRONG.play();
    }

    document.getElementById('next').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (gameIsOver()) {
        showEndScreen();
    }
    else {
        document.getElementById('next').disabled = true;

        updateProgressBar();
        clearBackgroundColor();
        showQuestion();
        showCurrentQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function clearBackgroundColor() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success', 'bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success', 'bg-danger');
}

function showCurrentQuestion() {
    let questionNumber = document.getElementById('currentQuestionNumber')

    questionNumber.innerHTML = "";
    questionNumber.innerHTML += currentQuestion + 1;
}

function restartGame() {
    document.getElementById('card_img').src = './assets/img/background.jpg';
    currentQuestion = -1;
    rightAnswerCount = 0;

    document.getElementById('end-screen').style = 'display: none';
    document.getElementById('question-body').style = '';
    nextQuestion();
}

function showEndScreen() {
    document.getElementById('question-body').style = 'display: none';
    document.getElementById('end-screen').style = '';
    document.getElementById('end-screen_all').innerHTML = questions.length;
    document.getElementById('right_answer-amount').innerHTML = rightAnswerCount;
    document.getElementById('card_img').src = './assets/img/trophy.png';
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress_bar').innerHTML = `${percent}%`;
    document.getElementById('progress_bar').style.width = `${percent}%`;
}