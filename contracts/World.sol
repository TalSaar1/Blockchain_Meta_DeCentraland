// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import "@openzeppelin/contracts/utils/Counters.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import './Token.sol';

enum LandType { NFT, PARK, ROAD }

contract World is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Token private token;

    struct Land {
        uint256 tokenId;
        uint8 row;
        uint8 col;
        LandType landType;
        string game;
        uint256 price;
    }

    mapping(uint256 => Land) private lands;

    constructor(Token _token) ERC721('Land', 'LAND') Ownable() {
        token = _token;
    }

    function mint(uint8 row, uint8 col, LandType landType, uint256 price) public onlyOwner {
        if (landType == LandType.PARK) {
            require(owner() == _msgSender(), 'Only the owner of the world can mint park');
        } else {
            require(landType == LandType.NFT);
        }

        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(_msgSender(), tokenId);
        setLand(Land(tokenId, row, col, landType, '', price));
    }

    function getTokensCount() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getMap() public view returns (address[] memory, Land[] memory) {
        uint256 numOfTokens = getTokensCount();
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

    function transferLand(uint256 tokenId, address to) public payable {
        require(lands[tokenId].landType == LandType.NFT, 'Only NFT lands can be transfer');
        require(_msgSender() != to, 'You cannot transfer land to yourself');

        token.transferFrom(to, _msgSender(), lands[tokenId].price * (10 ** token.decimals()));
        _transfer(_msgSender(), to, tokenId);
    }
}