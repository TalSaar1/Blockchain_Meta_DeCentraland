// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token is ERC20 {
    address payable fundsWallet;
    uint256 unitsOneEthCanBuy;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        fundsWallet = payable(_msgSender());
        unitsOneEthCanBuy = 10;
        _mint(_msgSender(), 10000 * 10**uint(decimals()));
    }

    function buyTokens() public payable {
        require(_msgSender() != fundsWallet);
        uint256 amount = msg.value * unitsOneEthCanBuy;
        require(balanceOf(fundsWallet) >= amount);

        _transfer(fundsWallet, _msgSender(), amount);

        fundsWallet.transfer(msg.value);
    }
}