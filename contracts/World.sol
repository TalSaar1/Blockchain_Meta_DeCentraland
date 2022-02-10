pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

//import "./Land.sol";

contract World {
    uint256 constant MAP_SIZE = 9;

    enum LandType { NFT, PARK, ROAD }

    struct Land {
        address owner;
        LandType landType;
        uint price;
        string content;
        uint8 row;
        uint8 col;
    }
    
    address owner;
    Land[MAP_SIZE][MAP_SIZE] public map;

    mapping(address => Land[]) public lands;

    constructor() public {
        owner = msg.sender;
        initMap();
    }

    function initMap() private {
        //initialPrice = uint(keccak256(abi.encodePacked(msg.sender, now))) % (MAX_INITIAL_PRICE - MIN_INITIAL_PRICE) + MIN_INITIAL_PRICE;

        for (uint8 i = 0; i < MAP_SIZE; i++) {
            for (uint8 j = 0; j < MAP_SIZE; j++) {
                map[i][j].owner = owner;
                map[i][j].row = i;
                map[i][j].col = j;
                if (i == 5 || j == 5) {
                    map[i][j].landType = LandType.ROAD;
                    map[i][j].price = 0;
                } else if (i >= 2 && i <= 4 && j >= 2 && j <= 4
                    || i >= 6 && i <= 8 && j >= 6 && j <= 8) {
                    map[i][j].landType = LandType.PARK;
                    map[i][j].price = 10;
                } else {
                    map[i][j].landType = LandType.NFT;
                    map[i][j].price = 15;
                }
            }
        }
    }

    /*function initMap() private {
        //initialPrice = uint(keccak256(abi.encodePacked(msg.sender, now))) % (MAX_INITIAL_PRICE - MIN_INITIAL_PRICE) + MIN_INITIAL_PRICE;

        for (uint8 i = 0; i < MAP_SIZE; i++) {
            for (uint8 j = 0; j < MAP_SIZE; j++) {
                //map[i][j].owner = msg.sender;
                map[i][j].row = i;
                map[i][j].col = j;
                if (i == 5 || j == 5) {
                    map[i][j].landType = LandType.ROAD;
                    map[i][j].price = 0;
                } else if (i >= 2 && i <= 4 && j >= 2 && j <= 4
                    || i >= 6 && i <= 8 && j >= 6 && j <= 8) {
                    map[i][j].landType = LandType.PARK;
                    map[i][j].price = 10;
                } else {
                    map[i][j].landType = LandType.NFT;
                    map[i][j].price = 15;
                }
            }
        }
    }*/

    function buyLand(uint row, uint col) public returns (bool success) {
        require(row >= 0 && row < MAP_SIZE && col >= 0 && col < MAP_SIZE);

        //map[row][col].transferFrom(map[row][col].getOwner(), msg.sender, 0);
        map[row][col].owner = msg.sender;
        lands[msg.sender].push(map[row][col]);

        return true;
    }

    function getMap() public view returns (Land[MAP_SIZE][MAP_SIZE] memory) {
        return map;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getMyLands() public view returns (Land[] memory) {
        return lands[msg.sender];
    }
}