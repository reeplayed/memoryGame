import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CardContent = styled.div`
  height: 120px;
  position: relative;
  @media(max-width: 1000px){
    height: 90px;
  }
  @media(max-width: 600px){
    height: 60px;
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  color: black;
  border: 2px solid #76d7c4;
  border-radius: 9px;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: all 0.5s;
  cursor: pointer;
`;
const CardFaceFront = styled(CardFace)`
  transform: rotateY(${({ side }) => (!side ? '0' : '180deg')});
  background: #566573;
`;
const CardFaceBack = styled(CardFace)`
  background: linear-gradient(45deg, rgba(229, 152, 102, 0), rgba(229, 152, 102, ${({
    guess,
  }) => (guess ? '0.7' : '0')})), url(${({ img }) => img});
  transform: rotateY(${({ side }) => (!side ? '180deg' : '360deg')});
  transition: all 0.5s;
  background-size: cover;
  background-position: center;
`;

const SingleCard = ({ click, index, img, guess, currentGuess }) => {
  const [side, setSide] = useState(false);
  const [clickAccess, setClickAccess] = useState(true);

  const onClickHandler = () => {
    setSide(true);
    click(index);
  };

  useEffect(() => {
    if (currentGuess === false) {
      setClickAccess(false);
      setTimeout(() => {
        setSide(false);
        setClickAccess(true);
      }, 450);
    } else if (currentGuess === 'retry') {
      setSide(false);
    }
  }, [currentGuess]);

  return (
    <CardContent>
      <CardFaceFront
        side={side || guess}
        onClick={() => (clickAccess ? onClickHandler() : null)}
      />
      <CardFaceBack side={side || guess} guess={guess} img={img} />
    </CardContent>
  );
};

export default SingleCard;
