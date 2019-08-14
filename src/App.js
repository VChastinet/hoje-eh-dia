import React, { useState } from 'react';
import mad from './assets/bolsomad.jpg'
import happy from './assets/bolsohappy.jpg'
import think from './assets/bolsothink.jpeg'

import './App.css';

const CURRENT_DATE = new Date();

const mood = {
  Sim: happy,
  'Não': mad,
}

function App() {
  const [answer, setAnswer] = useState('');
  const [lastDate, setLastDate] = useState('');

  const handleSubmit = (event) => {
    const [year, month, day] = lastDate.split('-');
    const brDate = new Date(year, month - 1, day);

    const deadLine = CURRENT_DATE - brDate;

    event.preventDefault();
    const answer = deadLine >= 24 * Math.pow(10, 7) ? 'Sim' : 'Não';
    setAnswer(answer);
  }

  const handleChange = ({ target: { value }}) => {
    setLastDate(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label htmlFor="lastDate"> Qual foi a ultima vez que você fez cocô? </label>
          <br />
          <input value={lastDate} id="lastDate" onChange={handleChange} type="date" />
          <br />
          <img height="400" width="400" src={(!answer ? think : mood[answer])} alt="mad biro liro" />
          <br />
          <button type="submit">Hoje é dia de fazer cocô?</button>
        </form>
        <p>
          {answer}
        </p>
      </header>
    </div>
  );
}

export default App;
