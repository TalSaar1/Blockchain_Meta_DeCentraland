import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Category, Row, ColLeft, Col, ColWithRight, ColRight } from '../style/table';
import { LAND_PARK, LAND_ROAD, LAND_TYPE } from '../constants/types';
import { TOKEN_SYMBOL } from '../constants/symbols';

const WrapperContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${props => props.backgroundColor};
    padding: 40px;
    z-index: 1000;
`;

const LandType = styled.div`
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 30px;
`;

const Button = styled.button`
    float: ${props => props.close ? 'left' : 'right'};
    background: ${props => props.close ? '#f44336' : '#4caf50'};
    border: 2px solid #ffffff;
    border-radius: 12px;
    color: white;
    margin-top: 30px;
    padding: 12px 26px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.4s;
    cursor: pointer;

    &:hover {
        background: #ffffff; 
        color: #000000; 
        border: 2px solid ${props => props.close ? '#f44336' : '#4caf50'};
    }
`;

export const Tabs = styled.div`
  overflow: hidden;
  background: #ffffff;
  font-family: Open Sans;
  height: 3em;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 40%;
  position: relative;

  margin-right: 0.1em;
  font-size: 1em;
  border: ${props => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${props => (props.active ? "none" : "")};
  background-color: ${props => (props.active ? "white" : "lightgray")};
  height: ${props => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;
export const Content = styled.div`
  ${props => (props.active ? "" : "display:none")}
`;

function Modal({ modalOpen, land, backgroundColor, address, transferLand, updateLand, play, onClose }) {
    const [newLand, setNewLand] = useState(undefined);
    const [toAddress, setToAddress] = useState(undefined);
    const [active, setActive] = useState(0);

    useEffect(() => {
        setNewLand(land);
    }, [land]);

    /*useEffect(() => {
        if (!forSale && typeof land !== 'undefined' && typeof land.price !== 'undefined') {
            delete newLand['price'];
            setNewLand(newLand);
        }
    }, [forSale]);*/

    function importGames(files) {
        let games = [''];
        files.keys().map(item => games.push(item.slice(2, item.length - 3)));
        return games;
    }

    const allGames = importGames(require.context('../games', false, /\.js$/));

    const handleClick = e => {
        const index = parseInt(e.target.id, 0);
        if (index !== active) {
          setActive(index);
        }
      };

    const renderMyLand = () => {
        return (
            <>
                <Tabs>
                    <Tab onClick={handleClick} active={active === 0} id={0}>Update</Tab>
                    <Tab onClick={handleClick} active={active === 1} id={1}>Transfer</Tab>
                </Tabs>
                <>
                    <Content active={active === 0}>
                        <h1>Update</h1>
                        <Row>
                            <ColLeft>
                                <Category>Owner</Category>
                            </ColLeft>
                            <Col>
                                <input type="text" value={land.owner} disabled />
                            </Col>
                        </Row>
                    </Content>
                    <Content active={active === 1}>
                        <h1>Transfer</h1>
                        <Row>
                            <ColLeft>
                                <Category>Owner</Category>
                            </ColLeft>
                            <Col>
                                <input type="text" value={land.owner} disabled />
                            </Col>
                        </Row>
                    </Content>
                </>
                <Button close onClick={onClose}>Close</Button>
            </>
        )
    }

    const renderOwnerLand = () => {
        return <>Owner</>
    }

    const renderGuestLand = () => {
        return (
            <>
                <Row>
                    <ColLeft>
                        <Category>Owner</Category>
                    </ColLeft>
                    <Col>
                        <input type="text" value={land.owner} disabled />
                    </Col>
                </Row>
                <Row>
                    <ColLeft>
                        <Category>Game</Category>
                    </ColLeft>
                    <Col>
                        <input type='text' value={land.game} disabled />
                    </Col>
                </Row>
                <Button close onClick={onClose}>Close</Button>
                <Button onClick={() => play(land)}>Play</Button>
            </>
        )
    }

    const renderLandType = () => {
        if (typeof address !== 'undefined') {
            return address === land.owner ? renderMyLand() : renderOwnerLand();
        }
        return renderGuestLand();
    }

    /*const renderLandType = () => {
        if (land.landType !== LAND_ROAD) {
            return (
                <>
                    {land.owner === address ?
                        <Row>
                            <ColLeft>
                                <Category>Game</Category>
                            </ColLeft>
                            <Col>
                                <select defaultValue={land.game} onChange={e => setNewLand({ ...newLand, game: e.target.value })}>
                                    {allGames.map((option, index) => <option key={index} value={option}>{option}</option>)}
                                </select>
                            </Col>
                        </Row>
                        : typeof land.game !== 'undefined' ?
                            <Row>
                                <ColLeft>
                                    <Category>Game</Category>
                                </ColLeft>
                                <Col>
                                    <input type='text' value={land.game} disabled />
                                </Col>
                            </Row>
                        : ''
                    }
                    {typeof address !== 'undefined' && land.landType !== LAND_PARK ?
                        <Row>
                            <ColLeft>
                                <Category>Price</Category>
                            </ColLeft>
                            <ColWithRight>
                                <input 
                                    type='number'
                                    defaultValue={land.price}
                                    onChange={e => setNewLand({ ...newLand, price: Number(e.target.value) })}
                                    disabled={address !== land.owner}
                                    style={{ color: address !== land.owner ? '#ffffff' : '#000000' }}
                                />
                            </ColWithRight>
                            <ColRight>
                                <input type='text' value={TOKEN_SYMBOL} disabled />
                            </ColRight>
                        </Row>
                        :
                        ''
                    }
                </>
            )
        }
    }*/

    /*const functionButton = () => {
        if (typeof address === 'undefined') {
            if (land.game !== '') {
                return (<Button onClick={() => play(land)}>Play</Button>);
            }
        } else if (address === land.owner) {
            return (
                <>
                    <Button onClick={() => updateLand(newLand)}>Update</Button>
                    <Button onClick={() => transferLand(land, toAddress)}>Transfer</Button>
                </>
            );
        }
        return <></>;
    }*/

    if (!modalOpen)
        return null;

    return ReactDOM.createPortal(
        <WrapperContainer>
            <Container backgroundColor={backgroundColor(land)}>
                <LandType>{LAND_TYPE[land.landType]} ({land.row},{land.col})</LandType>
                {renderLandType()}
            </Container>
        </WrapperContainer>,
        document.getElementById('portal')
    )
}

export default Modal;