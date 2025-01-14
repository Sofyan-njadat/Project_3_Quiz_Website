// const selectedTest2 = localStorage.setItem('selectedTest', 'English');
const testFiles = {
    English: './JSON/english.json',
    IQ: './JSON/iq.json',
    Technical: './JSON/technical.json'
};

const selectedTest = localStorage.getItem('selectedTest');

document.title = `${selectedTest} - Test`;
document.getElementById('testType').textContent = `${selectedTest} Test`;

async function loadTest(fileName) {
    try {
        const response = await fetch(fileName);
        const questions = await response.json();
        initializeTest(questions);
    } catch (error) {
        console.error("Error loading test:", error);
        document.getElementById('question').textContent = "Failed to load test!";
    }
}

let currentQuestionIndex = 0;
let questionsData = [];
let userAnswers = [];
let timer;
let timeLeft = 60;

function initializeTest(questions) {
    questionsData = questions;
    loadQuestion(currentQuestionIndex);
}

function loadQuestion(index) {
    const questionElement = document.getElementById('question');
    const questionNumberElement = document.getElementById('questionNumber');
    const answersContainer = document.querySelector('.answers');

    const questionData = questionsData[index];

    questionElement.textContent = questionData.question;
    questionNumberElement.textContent = `Question ${index + 1}`;
    answersContainer.innerHTML = "";

    questionData.options.forEach((option, i) => {
        const label = document.createElement('label'); 
        label.classList.add('answer-option');
        label.textContent = option;

        label.addEventListener('click', () => {
            document.querySelectorAll('.answer-option').forEach(option => option.classList.remove('selected'));

            label.classList.add('selected');

            userAnswers[currentQuestionIndex] = i;
        });

        answersContainer.appendChild(label);
    });
    startTimer();
}



const errorPopup = document.createElement('div');
errorPopup.className = 'error-popup';
errorPopup.textContent = 'Please select an answer!';
document.body.appendChild(errorPopup);

document.querySelector('.next-btn button').addEventListener('click', () => {
    if (userAnswers[currentQuestionIndex] === undefined) {
        const answersContainer = document.querySelector('.answers');
        const containerRect = answersContainer.getBoundingClientRect();

        errorPopup.style.top = `${containerRect.bottom + window.scrollY + 10}px`;
        errorPopup.style.left = `${containerRect.left + window.scrollX}px`;
        errorPopup.style.display = 'block'; 

        setTimeout(() => {
            errorPopup.style.display = 'none';
        }, 1000);

        return;
    }

    if (currentQuestionIndex === questionsData.length - 1) {
        finishTest();
    } else {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        stopTimer();
        if (currentQuestionIndex === questionsData.length - 1) {
            document.querySelector('.next-btn button').textContent = "Finish";
        }
    }
   
});


function finishTest() {
    const userData = {
        selectedTest: selectedTest,
        userAnswers: userAnswers
    };

    const username = "user1"; 
    localStorage.setItem(username, JSON.stringify(userData));

    window.location.href = 'result.html';
}
function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('TimeDisplay').textContent =` ${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')} MIN`;
}

function startTimer() {
    timeLeft = 60;
    updateTimerDisplay(timeLeft);

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            if (currentQuestionIndex < questionsData.length) {
                loadQuestion(currentQuestionIndex);
            } else {
                finishTest();
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

loadTest(testFiles[selectedTest]);