const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { readFileSync } = require('fs');
const { join } = require('path');
const port = 3000;

const config = require('./config.json');
const { generateQuestionPaper, getRandomQuestions } = require('./questionPaperGenerator');

app.use(bodyParser.json());

// Read the JSON string from the file
const questionStoreFilePath = join(__dirname, config.questionStoreFilePath);
const questionStore = JSON.parse(readFileSync(questionStoreFilePath, 'utf-8'));

app.post('/generateQuestionPaper', async (req, res) => {
  const { totalMarks, difficultyDistribution } = req.body;

  // Validation
  if (!totalMarks || !difficultyDistribution) {
    return res.status(400).json({ success: false, message: 'Total marks, difficulty distribution, and topic distribution are required' });
  }

  // Implement the logic to generate the question paper
  let questionPaper = await generateQuestionPaper(totalMarks, difficultyDistribution, questionStore);

  if (!questionPaper) {
    return res.status(500).json({ success: false, message: 'Error generating question paper' });
  }

  res.json({ success: true, questionPaper });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
