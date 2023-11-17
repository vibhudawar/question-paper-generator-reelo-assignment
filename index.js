// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const mongoURI = 'your_mongodb_connection_string'; // Replace with your MongoDB connection string
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let questionStore;

async function connectToMongoDB() {
  try {
    await client.connect();
    questionStore = client.db('questionDB').collection('questions');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

app.post('/addQuestion', async (req, res) => {
  const { question, subject, topic, difficulty, marks } = req.body;

  // Validation
  if (!question || !subject || !topic || !difficulty || !marks) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newQuestion = { question, subject, topic, difficulty, marks };
    await questionStore.insertOne(newQuestion);
    res.json({ success: true, message: 'Question added successfully' });
  } catch (error) {
    console.error('Error adding question to MongoDB:', error);
    res.status(500).json({ success: false, message: 'Error adding question to the database' });
  }
});

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
  const totalQuestions = await questionStore.countDocuments();

  for (const difficulty in difficultyDistribution) {
    const percentage = difficultyDistribution[difficulty];
    const difficultyQuestions = await questionStore.find({ difficulty }).toArray();
    const count = Math.ceil((percentage / 100) * totalMarks / 5);

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
