import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { Category, Row, ColLeft, Col, ColWithRight, ColRight } from '../style/table';
import { WrapperContainer, Container, LandType, Button, Tabs, Tab, Content } from '../style/modal';
import { LAND_NFT, LAND_PARK, LAND_ROAD, LAND_TYPE } from '../constants/types';
import { TOKEN_SYMBOL } from '../constants/symbols';
import { games } from '../constants/games';

function OwnerModal({ modalOpen, land, backgroundColor, address, approve, mint, transferLand, updateLand, onClose }) {
    const [newLand, setNewLand] = useState(undefined);
    const [allAddress, setAllAddress] = useState([]);
    const [toAddress, setToAddress] = useState(undefined);
    const [active, setActive] = useState(0);

    useEffect(() => {
        setNewLand(land);
    }, [land]);

    const getAllAddress = async () => {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        const web3 = new Web3(provider);
        let theAddress = await web3.eth.getAccounts();
        const theAllAddress = [''];

        for (let i = 0; i < theAddress.length; i++) {
            if (address !== theAddress[i]) {
                theAllAddress.push(theAddress[i]);
            }
        }

        setAllAddress(theAllAddress);
    }

    useEffect(getAllAddress, [address]);

    const handleClick = (event) => {
        const index = parseInt(event.target.id, 0);
        if (index !== active) {
            setActive(index);
        }
    };

    const renderUpdateLand = () => {
        return (
            <>
                <Row>
                    <ColLeft>
                        <Category>Owner</Category>
                    </ColLeft>
                    <Col>
                        <input type='text' value={newLand.owner} disabled />
                    </Col>
                </Row>
                <Row>
                    <ColLeft>
                        <Category>Game</Category>
                    </ColLeft>
                    <Col>
                        <select defaultValue={land.game} onChange={e => setNewLand({ ...newLand, game: e.target.value })}>
                            {games.map((game, index) => <option key={index} value={game}>{game}</option>)}
                        </select>
                    </Col>
                </Row>
                <Row>
                    <ColLeft>
                        <Category>Price</Category>
                    </ColLeft>
                    <ColWithRight>
                        <input 
                            type='number'
                            defaultValue={newLand.price}
                            onChange={e => setNewLand({ ...newLand, price: Number(e.target.value) })}
                            style={{ color: '#000000' }}
                        />
                    </ColWithRight>
                    <ColRight>
                        <input type='text' value={TOKEN_SYMBOL} disabled />
                    </ColRight>
                </Row>
                <Button close onClick={onClose}>Close</Button>
                <Button onClick={() => updateLand(newLand)}>Update</Button>
            </>
        )
    }

    const renderTransferLand = () => {
        return (
            <>
                <Row>
                    <ColLeft>
                        <Category>Owner</Category>
                    </ColLeft>
                    <Col>
                        <input type='text' value={land.owner} disabled />
                    </Col>
                </Row>
                <Row>
                    <ColLeft>
                        <Category>To Address</Category>
                    </ColLeft>
                    <Col>
                        <select onChange={e => setToAddress(e.target.value)}>
                            {allAddress.map((address, index) => <option key={index} value={address}>{address}</option>)}
                        </select>
                    </Col>
                </Row>
                <Row>
                    <ColLeft>
                        <Category>Price</Category>
                    </ColLeft>
                    <ColWithRight>
                        <input type='number' value={land.price} disabled />
                    </ColWithRight>
                    <ColRight>
                        <input type='text' value={TOKEN_SYMBOL} disabled />
                    </ColRight>
                </Row>
                <Button close onClick={onClose}>Close</Button>
                <Button onClick={() => transferLand(newLand, toAddress)}>Transfer</Button>
            </>
        )
    }

    const renderMyLand = () => {
        if (typeof land.tokenId === 'undefined' && land.landType !== LAND_ROAD) {
            return (
                <>
                    <Row>
                        <ColLeft>
                            <Category>Owner</Category>
                        </ColLeft>
                        <Col>
                            <input type='text' value={land.owner} disabled />
                        </Col>
                    </Row>
                    <Button close onClick={onClose}>Close</Button>
                    <Button onClick={() => mint(land)}>Mint</Button>
                </>
            )
        }
        if (land.landType !== LAND_NFT) {
            return (
                <>
                    <Row>
                        <ColLeft>
                            <Category>Owner</Category>
                        </ColLeft>
                        <Col>
                            <input type='text' value={land.owner} disabled />
                        </Col>
                    </Row>
                    {land.landType === LAND_PARK ?
                        <>
                            <Row>
                                <ColLeft>
                                    <Category>Game</Category>
                                </ColLeft>
                                <Col>
                                    <select defaultValue={newLand.game} onChange={e => setNewLand({ ...newLand, game: e.target.value })}>
                                        {games.map((game, index) => <option key={index} value={game}>{game}</option>)}
                                    </select>
                                </Col>
                            </Row>
                            <Button onClick={() => updateLand(newLand, toAddress)}>Update</Button>
                        </>
                        :
                        ''
                    }
                    <Button close onClick={onClose}>Close</Button>
                </>
            )
        }

        return (
            <>
                <Tabs>
                    <Tab onClick={handleClick} active={active === 0} id={0}>Update</Tab>
                    <Tab onClick={handleClick} active={active === 1} id={1}>Transfer</Tab>
                </Tabs>
                <>
                    <Content active={active === 0}>{renderUpdateLand()}</Content>
                    <Content active={active === 1}>{renderTransferLand()}</Content>
                </>
            </>
        )
    }

    const renderOwnerLand = () => {
        return (
            <>
                <Row>
                    <ColLeft>
                        <Category>Owner</Category>
                    </ColLeft>
                    <Col>
                        <input type='text' value={land.owner} disabled />
                    </Col>
                </Row>
                {land.landType !== LAND_ROAD && land.game !== '' ? 
                    <Row>
                        <ColLeft>
                            <Category>Game</Category>
                        </ColLeft>
                        <Col>
                            <input type='text' value={land.game} disabled />
                        </Col>
                    </Row>
                    :
                    ''
                }
                {land.landType === LAND_NFT ?
                    <>
                        <Row>
                            <ColLeft>
                                <Category>Price</Category>
                            </ColLeft>
                            <ColWithRight>
                                <input type='number' value={land.price} disabled />
                            </ColWithRight>
                            <ColRight>
                                <input type='text' value={TOKEN_SYMBOL} disabled />
                            </ColRight>
                        </Row>
                        <Button onClick={() => approve(land)}>Approve</Button>
                    </>
                    :
                    ''
                }
                <Button close onClick={onClose}>Close</Button>
            </>
        )
    }
 
    const renderLandType = () => {
        return address === land.owner ? renderMyLand() : renderOwnerLand();
    }

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

export default OwnerModal;