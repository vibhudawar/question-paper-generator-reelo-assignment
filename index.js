const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(bodyParser.json());

let questionStore;

// Read the JSON string from the file
const questionStoreFilePath = path.join(__dirname, 'questionStore.json');
questionStore = JSON.parse(fs.readFileSync(questionStoreFilePath, 'utf-8'));

app.post('/generateQuestionPaper', async (req, res) => {
  const { totalMarks, difficultyDistribution } = req.body;

  // Validation
  if (!totalMarks || !difficultyDistribution) {
    return res.status(400).json({ success: false, message: 'Total marks and difficulty distribution are required' });
  }

  // Implement the logic to generate the question paper
  let questionPaper = await generateQuestionPaper(totalMarks, difficultyDistribution);

  if (!questionPaper) {
    return res.status(500).json({ success: false, message: 'Error generating question paper' });
  }

  res.json({ success: true, questionPaper });
});

async function generateQuestionPaper(totalMarks, difficultyDistribution) {
  const questionPaper = [];

  for (const difficulty in difficultyDistribution) {
    const percentage = difficultyDistribution[difficulty];
    const difficultyQuestions = questionStore.filter(question => question.difficulty === difficulty);
    const count = Math.ceil((percentage / 100) * totalMarks);

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
  // to order the questions in the random manner
  const shuffledQuestions = questionArray.sort(() => 0.5 - Math.random());
  // return the selected elements in an array, as a new array
  return shuffledQuestions.slice(0, count);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
