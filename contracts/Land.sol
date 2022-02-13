pragma solidity ^0.5.0;
/*
import "./ERC721Full.sol";

contract Land is ERC721Full {
    address public owner;
    uint256 public tal;
    //string[30][30] public lands;

    constructor() ERC721Full("Land", "LAND") public {
        owner = msg.sender;
        tal = 100;
    }

    function mint(uint8 row, uint8 col) public {
        //lands[row][col] = content;
        _mint(owner, row * 30 + col);
    }
}*/