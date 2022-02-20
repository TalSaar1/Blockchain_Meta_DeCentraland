// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token is ERC20 {
    address payable private fundsWallet;
    uint256 private price;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        fundsWallet = payable(_msgSender());
        price = 0.1 ether;
        _mint(_msgSender(), 10000 * 10**uint(decimals()));
    }

    function getPrice() public view returns (uint256) {
        return price;
    }

    function buyTokens() public payable {
        require(_msgSender() != fundsWallet);
        uint256 amount = msg.value * (1 ether / price);
        require(balanceOf(fundsWallet) >= amount);

        _transfer(fundsWallet, _msgSender(), amount);

        fundsWallet.transfer(msg.value);
    }
}