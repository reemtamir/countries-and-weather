import { useState, useEffect } from 'react';

const Trivia = () => {
  const [questionList, setQuestionList] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch(
        'https://the-trivia-api.com/api/questions?categories=geography&limit=4&difficulty=easy&tags=capital_cities,flags'
      );

      const questionsData = await response.json();

      setQuestionList(
        questionsData.map((data) => {
          const {
            id,
            question,
            difficulty,
            correctAnswer,
            incorrectAnswers: answers,
          } = data;

          answers.push(correctAnswer);
          answers.sort();
          return { id, question, difficulty, answers, correctAnswer };
        })
      );
    };

    getQuestions();
  }, []);

  useEffect(() => {
    setCorrectAnswers(
      questionList.map((question) => {
        return question.correctAnswer;
      })
    );
  }, [questionList]);
  //   <input
  //   onChange={handleChange}
  //   className="form-check-input"
  //   type="radio"
  //   name={question.id}
  //   id={answer}
  //   value={answer}
  // /
  console.log(chosenAnswers);
  console.log(correctAnswers);
  
  const handleChange = ({ target: { name, value, id } }) => {
    let filterChosenArr = chosenAnswers.filter(
      (answer) => answer.name !== name
    );

    setChosenAnswers((chosenAnswers) => {
      return [...filterChosenArr, { name, value }];
    });
    console.log(chosenAnswers);
  };
  if (!questionList) return <p>process</p>;
  // console.log(questionList);
  // console.log(correctAnswers);
  return (
    <>
      {questionList.map((question) => {
        return (
          <div key={question.id} className="accordion accordion-flush">
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={`flush-heading${question.id}`}
              >
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${question.id}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse${question.id}`}
                >
                  {question.question}
                </button>
              </h2>

              <div
                id={`flush-collapse${question.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`flush-headingOne"`}
                data-bs-parent="#accordionFlushExample"
              >
                {question.answers.map((answer) => {
                  return (
                    <div key={answer} className="form-check">
                      <input
                        onChange={handleChange}
                        className="form-check-input"
                        type="radio"
                        name={question.id}
                        id={answer}
                        value={answer}
                      />
                      <label className="form-check-label" htmlFor={answer}>
                        {answer}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Trivia;
