
function hideSection() {
    const section = document.getElementById("finish");

    section.style.animation = "fadeOut 1s ease";
    section.style.visibility = "hidden";

    section.addEventListener("animationend", () => {

        section.style.marginTop = '0vw';
        document.getElementById("container").style.display = "block";
        document.getElementById("container").style.marginTop = "-3vw"
        document.getElementById("btn-seeResult").style.display = "none";
        document.body.style.overflow = 'auto';
    });

    // const testResults1 = {
    //     testId: "english",
    //     userAnswers: [0, 1, 0, 1, 2, 1, 1, 1, 1, 1]
    // };


    // localStorage.setItem('testResults', JSON.stringify(testResults1));


    const testResults = JSON.parse(localStorage.getItem('user1'));
    if (!testResults) {  //ensure that there is result in local storage
        alert('No test results found. Please complete the test first.');
        window.location.href = 'index.html'; // redirect user to home page
    }
    const testId = testResults.selectedTest;
    const userAnswers = testResults.userAnswers;

    fetch(`json/${testId}.json`)
        .then(response => response.json())
        .then(questions => {
            const correctAnswers = questions.map(q => q.correctOptionIndex);
            const score = userAnswers.filter((ans, i) => ans === correctAnswers[i]).length;

            const resultTitle = document.getElementById('result-title');
            const scoreElement = document.getElementById('score');

            if (score >= 5) {
                resultTitle.textContent = 'Congratulations!';
                document.getElementById('result-title').style.color = 'green';
                scoreElement.textContent = `You passed with a score of ${score} out of ${questions.length}.`;
            } else {
                resultTitle.textContent = 'Unfortunately!';
                document.getElementById('result-title').style.color = 'red';
                scoreElement.textContent = `You did not fulfill our requirements, Good Luck. `;
                scoreElement.textContent += `Your score ${score} out of ${questions.length}.`;
            }

            const tableContainer = document.getElementById('answers-table-container');
            let tableHTML = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Your Answer</th>
                                <th>Correct Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

            questions.forEach((question, i) => {
                const isCorrect = userAnswers[i] === correctAnswers[i];
                tableHTML += `
                        <tr>
                            <td>${question.question}</td>
                            <td style="color: ${isCorrect ? 'green' : 'red'};">${question.options[userAnswers[i]] || 'No Answer'}</td>
                            <td style="color: green;">${question.options[correctAnswers[i]]}</td>
                        </tr>
                    `;
            });

            tableHTML += '</tbody></table>';
            tableContainer.innerHTML = tableHTML;
        });
}
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title to the PDF
    const resultTitle = document.getElementById('result-title').textContent;
    doc.text(resultTitle, 10, 10);

    // Add score
    const scoreText = document.getElementById('score').textContent;
    doc.text(scoreText, 10, 20);

    // Add the answers table to the PDF
    const tableContainer = document.getElementById('answers-table-container');
    const rows = tableContainer.querySelectorAll('table tr');
    let yPosition = 30; // Start position for the table in the PDF

    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData = Array.from(cols).map(col => col.textContent);
        doc.text(rowData.join(' | '), 10, yPosition);
        yPosition += 10;
    });

    // Save the PDF
    doc.save('test_results.pdf');
}

document.getElementById('btn-downloadResult').addEventListener('click', function () {
    window.print(); 
});
