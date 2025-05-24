import { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    setLeaderboard(scores.sort((a, b) => b.score - a.score).slice(0, 5));
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
      {leaderboard.length === 0 ? (
        <p>No scores yet!</p>
      ) : (
        <ul className="list-disc pl-5">
          {leaderboard.map((entry, index) => (
            <li key={index}>
              {entry.name}: {entry.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;