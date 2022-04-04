const MyToken = artifacts.require('./MyToken.sol');

const tesseraKeys = [
  "wiqpMpUGzgqB4RDUyLbmBXkcQU4NJdyES0rHg2A39jg=",
  "n5si7WVQCinpdFKtXV+uQ3dlDjcFMEyvj9aMOvNFdBw=",
  "iqTeqnvEKdwZYTsDtrH7TwYs6x2uAuovmKznmzsJiQc=",
  "wNoLz/knKJ6HCO1zNO4Bo8pYZJlW8Evv4vixPha3nlw=",
  "eTKWifO/nyNZ+euNLnrkrpjJj+lwb9DWwrZp8+C5yHk=",
];

module.exports = function(deployer) {
  const _name = 'Scudo';
  const _symbol = 'SCD';
  const _decimals = 8;
  const _amount = 1000000;

  deployer.deploy(MyToken, _name, _symbol, _decimals, _amount, {
    privateFor: [tesseraKeys[1], tesseraKeys[2], tesseraKeys[3], tesseraKeys[4]]
  });
};
