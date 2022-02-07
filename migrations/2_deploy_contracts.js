const Map = artifacts.require('./Map.sol');

module.exports = function(deployer) {
  deployer.deploy(Map);
};