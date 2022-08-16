import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/fblalogo.png';
import Leaderboard from '../components/Leaderboard';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <div className="logo">
        <img alt="" className="logo-img" src={logo} />
      </div>

      <div className="main">
        <div className="left">
          <h1>Face to Name Trivia</h1>
          <p>
            See how many fellow members you can recognize! Every member you recognize earns you 1
            point - the only catch is can only get 3 faces wrong!
          </p>
          <Link to="/game">
            <button>
              <strong>Play Now!</strong>
            </button>
          </Link>
          <h1 className="play">How To Play?</h1>
          <p>
            Type the first name of each face that comes up. If you don’t know or get one wrong, you
            will lose 1 life. Lose 3 lives and your final score is recorded. You need [x] to make it
            to the Top 10!
          </p>
        </div>
        <Leaderboard />
      </div>
    </div>
  );
}

export default Home;
