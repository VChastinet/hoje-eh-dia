import React, { useState, Fragment } from 'react';

import {
  Button,
  Container,
  Image,
  Content,
  Form,
  Heading,
  Modal,
  Section
} from 'react-bulma-components/full';

import mad from './assets/bolsomad.jpg';
import happy from './assets/bolsohappy.jpg';
import think from './assets/bolsothink.jpeg';

import './App.css';

const CURRENT_DATE = new Date();

const textColor = {
  color: '#f8ffff',
}

const mood = {
  Sim: happy,
  Não: mad,
  think: think
};

function App() {
  const [answer, setAnswer] = useState('...');
  const [lastDate, setLastDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleAlert = () => setShowAlert(!showAlert);

  const handleSubmit = (event) => {
    event.preventDefault();

    const [year, month, day] = lastDate.split('-');
    const brDate = new Date(year, month - 1, day);

    if (brDate > CURRENT_DATE) {
      handleAlert();
      return;
    }

    setLoading(true);
    setAnswer('think');

    setTimeout(() => {
  
      const deadLine = CURRENT_DATE - brDate;

  
      const answer = deadLine >= 24 * Math.pow(10, 7) ? 'Sim' : 'Não';
      setAnswer(answer);
      setLoading(false);
    }, 800);

  };

  const handleChange = ({ target: { value } }) => {
    setLastDate(value);
  };

  return (
    <div className="main">
      <Container>
        <Content>
          <form onSubmit={handleSubmit}>
            <Form.Field>
              <Form.Label style={textColor} size="large">
                Qual foi a ultima vez que você fez cocô?
              </Form.Label>
              <Form.Control size="large" htmlFor="lastDate">
                <Form.Input
                  size="large"
                  value={lastDate}
                  id="lastDate"
                  onChange={handleChange}
                  type="date"
                />
              </Form.Control>
            </Form.Field>
            <div className="image">
              <Image
                alt="bolso icon"
                src={answer === '...' ? think : mood[answer]}
                />
            </div>
            <Heading size={1} style={textColor}>{loading ? '...' : answer}</Heading>
            <Button
              loading={loading}
              rounded
              size="large"
              color="danger"
              type="submit"
            >
              Hoje é dia de fazer cocô?
            </Button>
          </form>
        </Content>
      </Container>
      <Modal show={showAlert} onClose={handleAlert}>
        <Modal.Content>
          <Section style={{ backgroundColor: '#f8ffff' }}>
            <p> Você não pode fazer cocô no futuro! </p>
          </Section>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default App;
