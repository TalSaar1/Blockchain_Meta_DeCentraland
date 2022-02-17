const fs = require('fs');
const Token = artifacts.require('./Token.sol');
const World = artifacts.require('./World.sol');

module.exports = async (deployer) => {
  deployer.deploy(Token, 'Elad Tal Coin', 'ETC');

  const tokenInstance = await Token.deployed();

  deployer.deploy(World, tokenInstance.address).then(worldInstance => {
    fs.readFile('./map.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const world = JSON.parse(data);
      world.map(rowLands => {
        rowLands.map(land => {
          worldInstance.mint(land.tokenId, JSON.stringify(land))
        });
      });
    });
  });
};