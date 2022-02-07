pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Map {
    enum LandType{ NFT, PARK, ROAD }

    struct Land {
        address owner;
        LandType landType;
        uint amount;
        string content;
    }

    uint constant MAP_SIZE = 15;
    uint constant MAX_INITIAL_PRICE = 20;
    uint constant MIN_INITIAL_PRICE = 1;

    Land[MAP_SIZE][MAP_SIZE] public map;
    uint initialPrice;

    constructor() public {
        initMap();
    }

    function initMap() public {
        initialPrice = uint(keccak256(abi.encodePacked(now))) % MAX_INITIAL_PRICE + MIN_INITIAL_PRICE;

        for (uint i = 0; i < MAP_SIZE; i++) {
            for (uint j = 0; j < MAP_SIZE; j++) {
                if (i == 5 || j == 5) {
                    map[i][j].landType = LandType.ROAD;
                } else if (i >= 2 && i <= 4 && j >= 2 && j <= 4
                    || i >= 6 && i <= 8 && j >= 6 && j <= 8) {
                    map[i][j].landType = LandType.PARK;
                } else {
                    map[i][j].landType = LandType.NFT;
                    map[i][j].amount = initialPrice;
                }
            }
        }
    }

    // Adopting a pet
    function buyLand(uint row, uint col) public returns (uint, uint) {
        require(row >= 0 && row < MAP_SIZE && col >= 0 && col < MAP_SIZE);

        map[row][col].owner = msg.sender;

        return (row, col);
    }

    // Retrieving the map
    function getMap() public view returns (Land[MAP_SIZE][MAP_SIZE] memory) {
        return map;
    }
}