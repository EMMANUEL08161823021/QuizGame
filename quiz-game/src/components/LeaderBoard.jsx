import { useEffect, useState } from 'react';

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    setLeaderboard(scores.sort((a, b) => b.score - a.score).slice(0, 5));
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-left text-blue-700">
        🏆 Leaderboard
      </h3>
      {leaderboard.length === 0 ? (
        <div className="text-gray-500 italic">No scores yet!</div>
      ) : (
        <ul className="space-y-2">
          {leaderboard
            .sort((a, b) => b.score - a.score)
            .map((entry, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-3"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">
                    #{index + 1}
                  </span>
                  <span className="font-semibold text-gray-800">{entry.name}</span>
                </div>
                <span className="text-blue-600 font-bold">{entry.score}</span>
              </li>
            ))}
        </ul>
      )}
    </div>

  );
};

export default LeaderBoard;