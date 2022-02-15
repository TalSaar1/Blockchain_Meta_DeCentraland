// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

//enum LandType { NFT, PARK, ROAD }
//uint256 constant MAP_SIZE = 100;

contract World is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /*struct Land {
        uint256 tokenId;
        address owner;
        LandType landType;
        uint256 price;
        string content;
    }*/
    
    //address[MAP_SIZE][MAP_SIZE] map;

    constructor() ERC721('Land', 'LAND') Ownable() {}

    /*function mintAllLands() public {
        for (uint8 i = 0; i < MAP_SIZE; i++) {
            for (uint8 j = 0; j < MAP_SIZE; j++) {
                if (i == 5 || j == 5) {
                    mint(i, j, LandType.ROAD, 0, 'empty');
                } else if (i >= 2 && i <= 4 && j >= 2 && j <= 4
                    || i >= 6 && i <= 7 && j >= 6 && j <= 7) {
                    mint(i, j, LandType.PARK, 0, 'empty');
                } else {
                    mint(i, j, LandType.NFT, 12, 'empty');
                }
            }
        }
    }*/

    function mint() public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        //map[row][col] = msg.sender;
    
        return newItemId;
    }

    /*function getMap() public view returns (address[MAP_SIZE][MAP_SIZE] memory) {
        return map;
    }*/
}