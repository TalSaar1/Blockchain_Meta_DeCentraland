pragma solidity ^0.5.0;
/*
import "./Token.sol";

contract TokenSale {
    address payable owner;
    Token public token;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(Token _token, uint256 _tokenPrice) public {
        owner = msg.sender;
        token = _token;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokes) public payable {
        require(msg.value == multiply(_numberOfTokes, tokenPrice));
        require(token.balanceOf(address(this)) >= _numberOfTokes);
        require(token.transfer(msg.sender, _numberOfTokes));

        tokenSold += _numberOfTokes;

        emit Sell(msg.sender, _numberOfTokes);
    }

    function endSale() public {
        require(msg.sender == owner);
        require(token.transfer(owner, token.balanceOf(address(this))));

       owner.transfer(address(this).balance);
    }
}
*/