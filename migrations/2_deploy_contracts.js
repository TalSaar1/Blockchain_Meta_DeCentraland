const fs = require('fs');
const Token = artifacts.require('./Token.sol');
const World = artifacts.require('./World.sol');

module.exports = async (deployer) => {
  await deployer.deploy(Token, 'Elad Tal Coin', 'ETC');
  const tokenInstance = await Token.deployed();

  await deployer.deploy(World, tokenInstance.address);
  const worldInstance = await World.deployed();

  fs.readFile('./map.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const world = JSON.parse(data);
    world.map(land => worldInstance.mint(land));
  });
};