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

function Modal({ modalOpen, land, backgroundColor, owner, address, buyLand, updateLand, play, onClose }) {
    const [newLand, setNewLand] = useState(undefined);

    useEffect(() => {
        setNewLand(land);
    }, [land]);

    if (!modalOpen)
        return null;

    const renderNoRoad = () => {
        if (land.landType !== LAND_ROAD) {
            return (
                <>
                    {owner && land.landType !== LAND_PARK ? 
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
                    <Row>
                        <ColLeft>
                            <Category>Content</Category>
                        </ColLeft>
                        <Col>
                            <input
                                type='text'
                                defaultValue={land.content}
                                onChange={e => setNewLand({ ...newLand, content: e.target.value })}
                                disabled={!owner || address !== land.owner}
                                style={{ color: !owner || address !== land.owner ? '#ffffff' : '#000000' }}
                            />
                        </Col>
                    </Row>
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
                return (<Button onClick={play}>Play</Button>)
            }
            return <></>;
        }
        if (address === land.owner) {
            return (<Button onClick={() => updateLand(newLand)}>Update</Button>)
        }
        if (land.landType !== LAND_PARK) {
            return (<Button onClick={buyLand}>Buy</Button>)
        }
    }

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