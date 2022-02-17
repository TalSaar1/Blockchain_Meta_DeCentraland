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

const CheckBoxWrapper = styled.div`
  position: relative;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

function Modal({ modalOpen, land, backgroundColor, owner, address, buyLand, updateLand, play, onClose }) {
    const [newLand, setNewLand] = useState(undefined);
    const [forSale, setForSale] = useState(undefined);

    useEffect(() => {
        if (typeof land !== 'undefined') {
            setNewLand(land);
            setForSale(typeof land.price !== 'undefined');
        }
    }, [land]);

    useEffect(() => {
        if (!forSale && typeof land !== 'undefined' && typeof land.price !== 'undefined') {
            delete newLand['price'];
            setNewLand(newLand);
        }
    }, [forSale]);

    function importGames(files) {
        let games = [''];
        files.keys().map(item => games.push(item.slice(2, item.length - 3)));
        return games;
    }

    const allGames = importGames(require.context('../games', false, /\.js$/));

    const renderNoRoad = () => {
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
                    {owner && land.landType !== LAND_PARK ?
                        <>
                            {land.owner === address ? 
                                <Row>
                                    <ColLeft>
                                        <Category>For Sale</Category>
                                    </ColLeft>
                                    <Col>
                                        <CheckBoxWrapper>
                                            <CheckBox id='checkbox' type='checkbox' defaultChecked={forSale} onChange={e => setForSale(e.target.checked)} />
                                            <CheckBoxLabel htmlFor='checkbox' />
                                        </CheckBoxWrapper>
                                    </Col>
                                </Row>
                                :
                                ''
                            }
                            {forSale ? 
                                <Row>
                                    <ColLeft>
                                        <Category>Price</Category>
                                    </ColLeft>
                                    <ColWithRight>
                                        <input 
                                            type='number'
                                            defaultValue={land.price}
                                            onChange={e => setNewLand({ ...newLand, price: Number(e.target.value) })}
                                            disabled={!owner || address !== land.owner}
                                            style={{ color: !owner || address !== land.owner ? '#ffffff' : '#000000' }}
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
                        :
                        ''
                    }
                </>
            )
        }
    }

    const functionButton = () => {
        if (land.landType === LAND_ROAD) {
            return <></>;
        }
        if (!owner) {
            if (land.content !== '') {
                return (<Button onClick={() => play(land)}>Play</Button>)
            }
            return <></>;
        }
        if (address === land.owner) {
            return (<Button onClick={() => updateLand(newLand)}>Update</Button>)
        }
        if (land.landType !== LAND_PARK && forSale) {
            return (<Button onClick={() => buyLand(land)}>Buy</Button>)
        }
    }

    if (!modalOpen)
        return null;

    return ReactDOM.createPortal(
        <WrapperContainer>
            <Container backgroundColor={backgroundColor(land)}>
                <LandType>{LAND_TYPE[land.landType]} ({land.row},{land.col})</LandType>
                <Row>
                    <ColLeft>
                        <Category>Owner</Category>
                    </ColLeft>
                    <Col>
                        <input type="text" value={land.owner} disabled />
                    </Col>
                </Row>
                {renderNoRoad()}
                <Button close onClick={onClose}>Close</Button>
                {functionButton()}
            </Container>
        </WrapperContainer>,
        document.getElementById('portal')
    )
}

export default Modal;