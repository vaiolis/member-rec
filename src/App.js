import logo from './assets/fblalogo.png';
import './App.css';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="App">
      <div className='logo'>
        <img alt='' className='logo-img' src={logo}></img>
      </div>
     
      <div className='main'>
        <div className='left'>
            <h1>Face to Name Trivia</h1>
            <p>See how many fellow members you can recognize! Every member you recognize earns you 1 point - the only catch is can only get 3 faces wrong!</p>
            <button><strong>Play Now!</strong></button>
            <h1 className='play'>How To Play?</h1>
            <p>Type the first name of each face that comes up. If you don’t know or get one wrong, you will lose 1 life. Lose 3 lives and your final score is recorded. You need [x] to make it to the Top 10!</p>
        </div>
        <Leaderboard />
      </div>
    </div>
  );
}

export default App;
