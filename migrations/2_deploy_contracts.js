//const Token = artifacts.require('./Token.sol');
const World = artifacts.require('./World.sol');

module.exports = (deployer) => {
  //deployer.deploy(Token, "Elad Tal Coin", "ETC", 18, 1000000);
  deployer.deploy(World);

  /*.then(() => {
    const tokenPrice = 1000000000000000; // 0.001 Ether
    return deployer.deploy(TokenSale, Token.address, tokenPrice);
  });*/
};