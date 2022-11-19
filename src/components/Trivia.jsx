import { useState, useEffect } from 'react';

const Trivia = () => {
  const [questionList, setQuestionList] = useState([]);
  const [answersList, setAnswersList] = useState([]);

  useEffect(() => {
    const getQuestionS = async () => {
      const response = await fetch(
        'https://the-trivia-api.com/api/questions?categories=geography&limit=2&difficulty=easy&tags=capital_cities,flags'
      );

      const questionsData = await response.json();
      setQuestionList(questionsData);
      let allAnswers;
      for (let key of questionList) {
        console.log(key);
        let correctAns = key.correctAnswer;
        console.log(correctAns);
        let incorrectAns = key.incorrectAnswers;
        console.log(incorrectAns);
        allAnswers = [correctAns, ...incorrectAns];
      }
      console.log(questionList);
      console.log(answersList);
      console.log(allAnswers);
    };
    getQuestionS();
  }, []);

  if (!questionList) return;

  return (
    <>
      {questionList.map((question) => {
        return (
          <div key={question.id} className="mt-5">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={`flush-heading ${question.id}`}
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
                  aria-labelledby={`flush-heading${question.id}`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    {answersList.map((answers, index) => {
                      //   console.log('eeee', answers);

                      return (
                        <>
                          <div key={index} className="form-check">
                            {answers.map((answer, index) => {
                              //   console.log(answer[index]);
                              return (
                                <>
                                  <div key={index}>
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault1"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefault1"
                                    >
                                      {answer}
                                    </label>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Trivia;
