const Token = artifacts.require('./Token.sol');
const World = artifacts.require('./World.sol');

module.exports = (deployer) => {
  deployer.deploy(Token, 'Elad Tal Coin', 'ETC');
  deployer.deploy(World);
};