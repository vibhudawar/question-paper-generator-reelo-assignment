// questionPaperGenerator.js
function generateQuestionPaper(totalMarks, difficultyDistribution, questionStore) {
    const questionPaper = [];
    const totalQuestions = totalMarks; // Use totalMarks as the total number of questions

    for (const difficulty in difficultyDistribution) {
        const percentage = difficultyDistribution[difficulty];
        const difficultyQuestions = questionStore.filter(question => question.difficulty === difficulty);
        const count = Math.ceil((percentage / 100) * totalQuestions);

        if (count > difficultyQuestions.length) {
            console.error(`Not enough ${difficulty} questions available`);
            return null; // Return null to indicate an error in generating the question paper
        } else {
            const selectedQuestions = getRandomQuestions(difficultyQuestions, count);
            questionPaper.push(...selectedQuestions);
        }
    }

    return questionPaper;
}

function getRandomQuestions(questionArray, count) {
    const shuffledQuestions = questionArray.sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, count);
}

module.exports = {
    generateQuestionPaper,
    getRandomQuestions
};