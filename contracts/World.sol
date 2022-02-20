// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './Token.sol';

enum LandType { NFT, PARK, ROAD }

contract World is ERC721, Ownable {
    struct Land {
        uint256 tokenId;
        LandType landType;
        string game;
        uint256 price;
    }

    Token private token;
    uint256 private numOfTokens;

    mapping(uint256 => Land) private lands;

    constructor(Token _token) ERC721('Land', 'LAND') Ownable() {
        token = _token;
        numOfTokens = 0;
    }

    function mint(Land memory land) public onlyOwner {
        numOfTokens = land.tokenId;
        _mint(msg.sender, land.tokenId);
        setLand(land);
    }

    function getTokensCount() public view returns (uint256) {
        return numOfTokens;
    }

    function getMap() public view returns (address[] memory, Land[] memory) {
        address[] memory owners = new address[](numOfTokens);
        Land[] memory map = new Land[](numOfTokens);

        for (uint256 i = 0; i < numOfTokens; i++) {
            owners[i] = ownerOf(i + 1);
            map[i] = lands[i + 1];
        }

        return (owners, map);
    }

    function setLand(Land memory land) public {
        require(_exists(land.tokenId), 'Land set of nonexistent token');
        require(land.price >= 0, 'Land price cannot be negative number');

        lands[land.tokenId] = land;
    }

    function transferLand(Land memory land, address to) public payable returns (bool) {
        require(land.landType == LandType.NFT, 'Only NFT lands can be transfer');
        require(msg.sender != to, 'You cannot transfer land to yourself');

        token.transferFrom(to, msg.sender, land.price);
        _transfer(msg.sender, to, land.tokenId);

        return true;
    }
}