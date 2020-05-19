import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SingleCard from './SingleCard';
import '../style.css';
import _ from 'lodash';

const Content = styled.main`
  margin: 0 10px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-bottom: 30px;
`;
const CardsWrapper = styled.div`
  width: 700px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  margin: 10px auto;
  @media(max-width: 1000px){
    width: 500px;
  }
  @media(max-width: 600px){
    width: 310px;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const Typography = styled.div`
  font-size: 2rem;
  color: #76d7c4;
  text-align: center;
  font-family: 'Trade Winds';
  cursor: pointer;
`;
const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3;
`;
const ModalContent = styled.div`
  width: 400px;
  border: 3px solid #76d7c4;
  border-radius: 18px;
  margin: 120px auto;
  background: #566573;
  padding: 5px 15px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TextField = styled.input`
  border: 2px solid #76d7c4;
  border-radius: 8px;
  width: 100%;
  height: 46px;
  padding: 0 20px;
  font-size: 1.4rem;
  margin-top: 10px;
  font-family: 'Trade Winds';
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 1rem;
    color: #b2bec3;
    font-family: 'Trade Winds';
    :-ms-input-placeholder {
      margin: 0px;
    }
  }
`;
const Error = styled.p`
  margin: 5px 0;
  color: #76d7c4;
  font-family: 'Trade Winds';
`;
const Button = styled.button`
  margin: 15px 5px;
  padding: 10px 30px;
  cursor: pointer;
  border: 0;
  background: #76d7c4;
  border: 2px solid white;
  border-radius: 8px;
  color: white;
  font-family: 'Trade Winds';
  font-size: 1.3rem;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagesList = [
  'https://mymodernmet.com/wp/wp-content/uploads/2019/12/christian-vizl-silent-kingdom-2.jpg',
  'https://mymodernmet.com/wp/wp-content/uploads/2019/12/christian-spencer-hummingbird-photography-3.jpg',
  'https://mymodernmet.com/wp/wp-content/uploads/2019/12/dick-van-duijn-animal-photography-5.jpg',
  'https://mymodernmet.com/wp/wp-content/uploads/2019/12/nasa-iss-sun-photograph.jpg',
  'https://mymodernmet.com/wp/wp-content/uploads/2019/12/luke-rasmussen-climbinng-photography-11.jpg',
  'https://mymodernmet.com/wp/wp-content/uploads/2019/03/andrew-mccarthy-mineral-moon.jpg',
  'https://mymodernmet.com/wp/wp-content/uploads/2019/10/aaron-reed-nature-photography-2.jpg',
  'https://mymodernmet.com/wp/wp-content/uploads/2019/06/golden-gate-bridge-lightning-1.jpg',
  'https://mymodernmet.com/wp/wp-content/uploads/2019/12/the-blue-border-kilian-schonberger-1.jpg',
  'https://mymodernmet.com/wp/wp-content/uploads/2019/02/will-burrard-lucas-black-leopard-3.jpg',
];

let index = [1, 2, 6, 5, 1, 6, 4, 3, 5, 3, 4, 2, 7, 7, 8, 8, 9, 9, 10, 10];

const MainPage = () => {
  const [guessItems, setGuessItems] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(false);
  const [modalOpen, setModalOpen] = useState(localStorage.name ? false : true);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [counter, setCounter] = useState(0);
  const [countdown, setCountdown] = useState(false);
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [items, setItems] = useState(_.shuffle(index));

  const retryHandler = () => {
    setGuessItems([]);
    setCountdown(false);
    setCounter(0);
    setCurrentGuess('retry');
    setTimeout(()=>{
      setItems(_.shuffle(index));
    }, 300)
    
  };

  const closeModal = () => {
    setModalOpen(false);
    setName('');
    setError('');
  };

  const startHandler = () => {
    if (countdown) return;
    setGuessItems(index);
    setCountdown(true);
    setTimeout(() => {
      setGuessItems([]);
    }, 1000);
  };

  const setNameHandler = e => {
    e.preventDefault();

    if (name === '') {
      return setError('This field is empty.');
    }
    if (/\W/.test(name)) {
      return setError('Name contain only letters and numbers.');
    }
    localStorage.setItem('name', name);
    closeModal();
  };

  const onClickHandler = index => {
    if (!countdown) {
      setCountdown(true);
    }
    if (currentGuess === false || currentGuess === 'retry') {
      setCurrentGuess(index);
    } else if (currentGuess === index) {
      setGuessItems([...guessItems, index]);
      setCurrentGuess(false);
      console.log(guessItems.length)
      if(guessItems.length===9){
        setCountdown(false)
        setWinModalOpen(true);
      }
    } else if (currentGuess !== index) {
      setCurrentGuess(false);
    }
  };

  useEffect(() => {
    if (!countdown) return;
    const timer = setInterval(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);
  }, [counter, countdown]);

  const Modal = (
    <Backdrop>
      <ModalContent>
        <Typography>Set your name :</Typography>
        <form>
          <TextField
            type="text"
            maxLength={12}
            placeholder="Set your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Error>{error}</Error>
          <Wrapper>
            <Button onClick={e => setNameHandler(e)}>Apply</Button>
            {localStorage.name && (
              <Button onClick={() => closeModal()}>Back</Button>
            )}
          </Wrapper>
        </form>
      </ModalContent>
    </Backdrop>
  );
  
  const WinModal = () => (
    <Backdrop>
      <ModalContent>
        <Typography>
          Your time: {counter}s
        </Typography>
        <Button onClick={() => {
            setWinModalOpen(false);
            retryHandler();
          }}>Retry</Button>
      </ModalContent>
    </Backdrop>
  )
  return (
    <>
      {winModalOpen && <WinModal/>}
      {modalOpen && Modal}
      <InfoWrapper>
          <Typography onClick={() => setModalOpen(true)}>
            Welcome {localStorage.name}
          </Typography>
          <Typography>Time: {counter}s</Typography>
        </InfoWrapper>
      <Content>
        
        <CardsWrapper>
          {items.map(index => (
            <SingleCard
              click={onClickHandler}
              index={index}
              img={ImagesList[index - 1]}
              guess={guessItems.includes(index)}
              currentGuess={currentGuess}
            />
          ))}
        </CardsWrapper>
        <Wrapper>
          <Button onClick={() => retryHandler()}>Retry</Button>
          <Button onClick={() => startHandler()}>Start</Button>
        </Wrapper>
      </Content>
    </>
  );
};

export default MainPage;
