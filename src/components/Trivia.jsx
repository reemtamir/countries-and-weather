import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const Trivia = ({ setIsTriviaClicked }) => {
  const [questionList, setQuestionList] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [points, setPoints] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [isShown, setIsShown] = useState('none');

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch(
        `https://the-trivia-api.com/api/questions?categories=geography&limit=${numOfQuestions}&difficulty=${difficulty}&tags=capital_cities,flags`
      );

      const questionsData = await response.json();

      setQuestionList(
        questionsData.map((data) => {
          const {
            id,
            question,

            correctAnswer,
            incorrectAnswers: answers,
          } = data;

          answers.push(correctAnswer);
          answers.sort();
          return { id, question, answers, correctAnswer };
        })
      );
    };

    getQuestions();
  }, [newGame, difficulty, numOfQuestions]);

  useEffect(() => {
    setCorrectAnswers(
      questionList.map((question) => {
        return question.correctAnswer;
      })
    );
  }, [questionList, newGame]);

  const chooseDifficulty = ({ target: { value } }) => {
    switch (Number(value)) {
      case 1:
        setDifficulty('easy');
        break;
      case 2:
        setDifficulty('medium');
        break;
      case 3:
        setDifficulty('hard');
        break;

      default:
        break;
    }

    startNewGame();
  };

  const startNewGame = () => {
    setNewGame((newGame) => !newGame);
    setPoints(0);
    setChosenAnswers([]);
    setIsShown('none');
  };
  const submit = () => {
    let score = chosenAnswers.filter((answer) =>
      correctAnswers.includes(answer.value)
    );
    if (chosenAnswers.length < correctAnswers.length) {
      alert('You need to answer all questions');
      return;
    } else {
      setPoints(score.length);
      setIsShown('block');
    }
  };
  const handleChange = ({ target: { name, value, id } }) => {
    let filterChosenArr = chosenAnswers.filter(
      (answer) => answer.name !== name
    );

    setChosenAnswers(() => {
      return [...filterChosenArr, { name, value }];
    });
  };
  const remove = () => {
    setIsTriviaClicked(false);
  };
  if (!questionList.length) {
    return (
      <div className="container m-auto ">
        <LoadingButton loading variant="outlined">
          Submit
        </LoadingButton>
      </div>
    );
  }

  return (
    <>
      <div className="w-75 m-auto mb-5 trivia">
        <div className="w-25 m-auto mt-3">
          <div className="form-check   ">
            <input
              onChange={({ target: { value } }) => {
                setNumOfQuestions(Number(value));
                startNewGame();
              }}
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={5}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              5 questions
            </label>
          </div>
          <div className="form-check col col-12">
            <input
              onChange={({ target: { value } }) => {
                setNumOfQuestions(Number(value));
                startNewGame();
              }}
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value={10}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              10 questions
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-between my-5">
          <p className="fs-3 text-primary">
            Score: {points} out of {numOfQuestions}
          </p>{' '}
          <div className="d-flex flex-column bd-highlight mb-3">
            <input
              onChange={chooseDifficulty}
              type="range"
              className="form-range "
              min="1"
              max="3"
              step="1"
              id="customRange3"
              defaultValue={'1'}
            ></input>
            <div className=" bd-highlight">Easy | Medium | Hard</div>
          </div>
          <button
            className="btn btn-success  flex-row-reverse bd-highlight mb-3 "
            onClick={startNewGame}
          >
            New game
          </button>
        </div>

        <div className="row w-50 m-auto box-shadow">
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
                  <p style={{ display: isShown }} className="bg-success  fs-5">
                    {' '}
                    The correct answer is:{' '}
                    <span className="text-warning">
                      {question.correctAnswer}
                    </span>{' '}
                  </p>
                </div>
              </div>
            );
          })}

          <button className="btn btn-info w-50  m-auto mt-3" onClick={submit}>
            Submit answers
          </button>
        </div>
      </div>

      <button onClick={remove} className="btn btn-primary">
        Back
      </button>
    </>
  );
};

export default Trivia;
