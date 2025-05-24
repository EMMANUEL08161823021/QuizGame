import PropTypes from 'prop-types';

const Question = ({ question, onAnswer }) => {
  if (!question || !question.question || !question.options) {
    return <div className="text-red-500">Invalid question data</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full bg-gray-200 p-2 rounded hover:bg-gray-300 text-left"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.string.isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default Question;