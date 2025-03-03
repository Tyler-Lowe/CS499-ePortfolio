import { useEffect, useState } from 'react';
import './App.css';
import { dealCards } from './logic/deal';
import PlayerHand from "./components/PlayerHand";
import Battlefield from "./components/Battlefield";

function App() {
  const [playerName, setPlayerName] = useState("Player");
  const [playerStats, setPlayerStats] = useState({ wins: 0, losses: 0 });
  const [cpuPlayer, setCpuPlayer] = useState([]);
  const [playerOne, setPlayerOne] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [cpuCurrentCard, setCpuCurrentCard] = useState(null);
  const [playerOneCurrentCard, setPlayerOneCurrentCard] = useState(null);
  const [roundWinner, setRoundWinner] = useState('');
  const [tiePile, setTiePile] = useState([]); // Holds cards in case of a tie

  // Fetch player stats on load
  useEffect(() => {
    fetch(`/api/stats/${playerName}`)
      .then(response => response.json())
      .then(data => setPlayerStats(data))
      .catch(err => console.error("Error fetching player stats:", err));
  }, [playerName]);

  const handleGameEnd = (didWin) => {
    fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName, didWin })
    }).then(() => {
      fetch(`/api/stats/${playerName}`)
        .then(response => response.json())
        .then(data => setPlayerStats(data))
        .catch(err => console.error("Error updating player stats:", err));
    });
  };

  // Deal cards and start game
  const handleDealingCards = () => {
    const dealtCards = dealCards();
    if (dealtCards) {
      const { cpuPlayer: cpu, playerOne: player } = dealtCards;
      setCpuPlayer(cpu);
      setPlayerOne(player);
      setGameStarted(true);
    } else {
      alert('Error: Unable to deal cards. Please try again.');
    }
  };

  // Handle battle logic
  const handleBattle = () => {
    if (cpuPlayer.length === 0 || playerOne.length === 0) {
      alert('Game Over! Restart to play again.');
      handleGameEnd(playerOne.length > 0); // If playerOne still has cards, they win
      return;
    }

    const cpuCard = cpuPlayer.shift();
    const playerCard = playerOne.shift();

    setCpuCurrentCard(cpuCard);
    setPlayerOneCurrentCard(playerCard);

    if (cpuCard.value > playerCard.value) {
      setRoundWinner('CPU Wins!');
      setCpuPlayer([...cpuPlayer, cpuCard, playerCard, ...tiePile]);
      setTiePile([]);
    } else if (playerCard.value > cpuCard.value) {
      setRoundWinner('Player One Wins!');
      setPlayerOne([...playerOne, playerCard, cpuCard, ...tiePile]);
      setTiePile([]);
    } else {
      setRoundWinner('It’s a Tie! Cards added to tie pile.');
      setTiePile([...tiePile, cpuCard, playerCard]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">War Card Game</h1>

      {/* Player Stats */}
      <div className="text-center">
        <h2 className="text-lg font-semibold">{playerName}'s Stats</h2>
        <p>Wins: {playerStats.wins}</p>
        <p>Losses: {playerStats.losses}</p>
      </div>

      {gameStarted ? (
        <div>
          <Battlefield cpuCard={cpuCurrentCard} playerCard={playerOneCurrentCard} />
          <h3 className="text-center mt-4">{roundWinner}</h3>
          <button
            onClick={handleBattle}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Battle
          </button>
        </div>
      ) : (
        <button
          onClick={handleDealingCards}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Deal Cards
        </button>
      )}

      <div className="mt-4">
        <h2>CPU Hand ({cpuPlayer.length} cards)</h2>
        <PlayerHand hand={cpuPlayer} />
      </div>
      <div className="mt-4">
        <h2>Player Hand ({playerOne.length} cards)</h2>
        <PlayerHand hand={playerOne} />
      </div>
    </div>
  );
}

export default App;
