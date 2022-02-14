// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "./Land.sol";

contract World {
    uint256 constant MIN_INITIAL_PRICE = 5;
    uint256 constant MAX_INITIAL_PRICE = 20;

    enum LandType { NFT, PARK, ROAD }

    struct Land {
        address owner;
        LandType landType;
        uint256 price;
        string content;
        uint8 row;
        uint8 col;
    }
    
    address owner;
    mapping(uint8 => mapping(uint8 => Land)) public map;

    constructor() {
        owner = msg.sender;
        initMap();
    }

    function initMap() private {
        uint256 initialPrice = uint256(keccak256(abi.encodePacked(msg.sender))) % (MAX_INITIAL_PRICE - MIN_INITIAL_PRICE) + MIN_INITIAL_PRICE;

        for (uint8 i = 0; i < 20; i++) {
            for (uint8 j = 0; j < 20; j++) {
                map[i][j].owner = owner;
                map[i][j].row = i;
                map[i][j].col = j;
                if (i == 5 || j == 5) {
                    map[i][j].landType = LandType.ROAD;
                } else if (i >= 2 && i <= 4 && j >= 2 && j <= 4
                    || i >= 6 && i <= 8 && j >= 6 && j <= 8) {
                    map[i][j].landType = LandType.PARK;
                } else {
                    map[i][j].landType = LandType.NFT;
                    map[i][j].price = initialPrice;
                }
            }
        }
    }

    /*function setLand(Land memory land) public {
        uint8 row = land.row;
        uint8 col = land.col;
        require(row >= 0 && row < MAP_SIZE && col >= 0 && col < MAP_SIZE);

        map[row][col] = land;
    }*/

    function buyLand(uint8 row, uint8 col) public returns (bool success) {
        //require(row >= 0 && row < MAP_SIZE && col >= 0 && col < MAP_SIZE);

        //map[row][col].transferFrom(map[row][col].getOwner(), msg.sender, 0);
        map[row][col].owner = msg.sender;
        //lands[msg.sender].push(map[row][col]);

        return true;
    }

    /*function getMap() public view returns (Land[][] memory) {
        return map;
    }*/
}