import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin-top: 60px;
  text-align: center;
`;

const Header = styled.div`
  font-size: ${props => props.big ? "50px" : "42px"};
  padding: 20px;
`;

const Buttons = styled.div`
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 600px;
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  background-color: #66ff99;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  margin: 30px;

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

function Main({ setOwner }) {
  return (
    <Container>
      <Header big>Welcome to Meta DeCentraland</Header>
      <Header small>Enter As:<Header/>
      </Header>
      <Buttons>
        <Button type='button' onClick={() => setOwner(true)}>Owner</Button>
        <Button type='button' onClick={() => setOwner(false)}>Guset</Button>
      </Buttons>
    </Container>
  )
}

export default Main;