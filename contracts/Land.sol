pragma solidity ^0.5.0;
/*
import "./ERC721Full.sol";

contract Land is ERC721Full {
    enum LandType { NFT, PARK, ROAD }

    struct Land {
        LandType landType;
        uint256 price;
        string content;
        uint8 row;
        uint8 col;
    }

    address public owner = msg.sender;
    Land public land;

    constructor(LandType _landType, uint256 _price, string memory _content, uint8 _row, uint8 _col) ERC721Full("Land", "NFT") public {
        land = Land(_landType, _price, _content, _row, _col);
    }

    function mint() public {
        _mint(msg.sender, 0);
    }
}*/