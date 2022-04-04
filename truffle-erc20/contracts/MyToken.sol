pragma solidity ^0.5.2;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract MyToken is ERC20, ERC20Detailed {

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _amount)
      ERC20Detailed(_name, _symbol, _decimals) public {
        require(_amount > 0, "Amount has to be greater than 0");
        _mint(msg.sender, _amount);
    }

/*
    function getBalanceOf(address account) public view returns(uint256){
        return balanceOf(account);
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply();
    }
*/
}