import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/fblalogo.png';
import Leaderboard from '../components/Leaderboard';
import './Home.css';

function Home() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 grid-cols-1 lg:bg-gradient-to-r from-black via-[#000e4b] to-black text-white lg:h-[100vh] background-animate">
      <div className="lg:px-32 px-10 py-14 m-auto">
        <div className="object-cover h-24 w-48">
          <img alt="" className="logo-img" src={logo} />
        </div>
        <div className="">
          <h1 className="font-bold text-2xl text-blue-700">Member Mania</h1>
          <p className="text-lg my-5">
            See how many fellow members you can recognize! Every member you recognize earns you 1
            point - the only catch is you can only get 3 faces wrong!
          </p>
          <Link to="/game">
            <button className='my-5 rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-900 transition hover:scale-[1.05]'>
              <strong>Play Now!</strong>
            </button>
          </Link>
          <h1 className="font-bold text-2xl text-blue-700 my-5">How To Play?</h1>
          <p className='text-lg my-5'>
            Type the first name of each face that comes up. If you don’t know or get one wrong, you
            will lose 1 life. Lose 3 lives and your final score is recorded. Try to make it to the top ten!
          </p>
        </div>
      </div>
      <Leaderboard />
    </div>
  );
}

export default Home;
