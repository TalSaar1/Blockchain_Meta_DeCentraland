const Token = artifacts.require('./Token.sol');
const World = artifacts.require('./World.sol');

module.exports = (deployer) => {
  deployer.deploy(Token, "Elad Tal Coin", "ETC", 18, 10, 100000);
  deployer.deploy(World);
};