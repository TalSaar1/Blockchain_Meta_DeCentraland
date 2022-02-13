pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

//import "./Land.sol";

contract World {
    uint256 constant MAP_SIZE = 9;
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
    Land[MAP_SIZE][MAP_SIZE] public map;

    //mapping(address => Land[]) public lands;

    constructor() public {
        owner = msg.sender;
        initMap();
    }

    function initMap() private {
        uint256 initialPrice = uint256(keccak256(abi.encodePacked(msg.sender, now))) % (MAX_INITIAL_PRICE - MIN_INITIAL_PRICE) + MIN_INITIAL_PRICE;

        for (uint8 i = 0; i < MAP_SIZE; i++) {
            for (uint8 j = 0; j < MAP_SIZE; j++) {
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

    function setLand(Land memory land) public {
        uint8 row = land.row;
        uint8 col = land.col;
        require(row >= 0 && row < MAP_SIZE && col >= 0 && col < MAP_SIZE);

        map[row][col] = land;
    }

    function buyLand(uint row, uint col) public returns (bool success) {
        require(row >= 0 && row < MAP_SIZE && col >= 0 && col < MAP_SIZE);

        //map[row][col].transferFrom(map[row][col].getOwner(), msg.sender, 0);
        map[row][col].owner = msg.sender;
        //lands[msg.sender].push(map[row][col]);

        return true;
    }

    function getMap() public view returns (Land[MAP_SIZE][MAP_SIZE] memory) {
        return map;
    }
}