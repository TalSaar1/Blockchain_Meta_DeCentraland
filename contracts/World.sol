// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './Token.sol';

contract World is ERC721URIStorage, Ownable {
    Token token;
    uint256 private numOfTokens;

    constructor(Token _token) ERC721('Land', 'LAND') Ownable() {
        token = _token;
        numOfTokens = 0;
    }

    function mint(uint256 tokenId, string memory tokenURI) public onlyOwner {
        numOfTokens = tokenId;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function getTokensCount() public view returns (uint256) {
        return numOfTokens;
    }

    function getMap() public view returns (address[] memory, string[] memory) {
        address[] memory owners = new address[](numOfTokens);
        string[] memory map = new string[](numOfTokens);

        for (uint256 i = 0; i < numOfTokens; i++) {
            owners[i] = ownerOf(i + 1);
            map[i] = tokenURI(i + 1);
        }

        return (owners, map);
    }

    function sellLand(uint256 tokenId, uint256 price, address to) public payable returns (bool) {
        /*address ownerOfToken = ownerOf(tokenId);
        token.approve(msg.sender, msg.value * price);
        bool success = token.transferFrom(msg.sender, ownerOfToken, msg.value * price);

        if (success) {
            setApprovalForAll(msg.sender, true);
            //approve(msg.sender, tokenId);
            transferFrom(ownerOfToken, msg.sender, tokenId);
        }*/

        _transfer(msg.sender, to, tokenId);

        return true; //success;
    }

    function updateLand(uint256 tokenId, string memory tokenURI) public {
        require(msg.sender == ownerOf(tokenId));
        _setTokenURI(tokenId, tokenURI);
    }
}