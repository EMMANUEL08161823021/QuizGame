import { useState, useEffect } from 'react';
import Question from './components/Question';
import questionsData from './data/questions.json';
import LeaderBoard from './components/LeaderBoard';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validate and load questions
    try {
      if (!questionsData || !Array.isArray(questionsData) || questionsData.length === 0) {
        throw new Error('Invalid or empty questions data');
      }
      setQuestions(questionsData);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, gameOver, questions]);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 10);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      setGameOver(true);
      // Save score to leaderboard
      if (playerName) {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
        leaderboard.push({ name: playerName, score });
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
      }
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setTimeLeft(30);
    setPlayerName('');
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  if (!questions.length) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="w-[500px] mx-auto flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">🚀 Quiz Game</h1>

        {!gameOver ? (
          <>
            {!playerName && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Enter Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
              <span>⏳ Time Left: <strong>{timeLeft}s</strong></span>
              <span>⭐ Score: <strong>{score}</strong></span>
            </div>

            <Question
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-green-600">🎉 Game Over!</h2>
            <p className="text-lg">Final Score: <span className="font-bold">{score}</span></p>

            <button
              onClick={restartGame}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-all"
            >
              🔄 Play Again
            </button>

            <div className="pt-6">
              <LeaderBoard/>
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default App;