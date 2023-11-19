# Question Paper Generator

**Problem Statement:**

Design and implement a Question Paper Generator application

The application must store a number of questions in a Question Store. A question can have the following attributes:

```
{question, subject, topic, difficulty, marks}
```

**Example**

Assume the below requirement for a question paper:

> (100 marks, Difficulty, {20% Easy, 50% Medium, 30% Hard })

The problem statement here is that you need to generate a question paper of 100 marks total of which 20% (ie, 20 marks) worth of questions should have the: Difficulty=Easy, 50% having *Difficulty*=Medium and 30% having *Difficulty*=Hard

## Running Locally:
- Clone the project:
```
https://github.com/vibhudawar/question-paper-generator-reelo-assignment.git
```

- install the dependencies
```
npm i
```

- run the server:
```
node index.js
```

The server will be running on localhost:3000

## Endpoint Testing using Postman:
Follow the below steps:

**Install Postman:**
If you haven't installed Postman, you can download and install it from the official website.

**Create a POST Request in Postman:**

- Open Postman.
- Create a new request by clicking on the "New" button and then selecting "Request."
- Give your request a name (e.g., "Generate Question Paper"). Select the HTTP method as "POST." Enter the URL for your local server, which is ```http://localhost:3000/generateQuestionPaper.```
- Go to the "Body" tab, select "raw," and choose the "JSON (application/json)" option.

- Input Request Body: In the request body, provide the required parameters. For this example, you need to send a JSON object containing totalMarks and difficultyDistribution. For instance:

```
{
  "totalMarks": 50,
  "difficultyDistribution": {
    "Easy": 30,
    "Medium": 40,
    "Hard": 30
  }
}
```

- Send the Request: Click the "Send" button to send the request to your server.




## Tech Stack
**Server:** Node, Express

**Testing Tool:** Postman



## License

[MIT](https://choosealicense.com/licenses/mit/)

