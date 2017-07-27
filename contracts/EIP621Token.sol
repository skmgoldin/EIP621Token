pragma solidity 0.4.13;

import "tokens/HumanStandardToken.sol";


contract EIP621Token is HumanStandardToken {

    address public supplyOracle;
  
    modifier onlySupplyOracle {
        require(msg.sender == supplyOracle);
        _;
    }

    function EIP621Token(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol,
        address _supplyOracle
    ) HumanStandardToken(
        _initialAmount,
        _tokenName,
        _decimalUnits,
        _tokenSymbol
    ) 
    {
        require(_supplyOracle != 0);
        supplyOracle = _supplyOracle; 
    }

    function increaseSupply(uint value, address to) public onlySupplyOracle {
        totalSupply = safeAdd(totalSupply, value);
        balances[to] = safeAdd(balances[to], value);

        Transfer(0, to, value);
    }

    function safeAdd(uint a, uint b) internal returns (uint) {
        require(a + b >= a);
        return a + b;
    }

    function decreaseSupply(uint value, address from) public onlySupplyOracle {
        balances[from] = safeSub(balances[from], value);
        totalSupply = safeSub(totalSupply, value);

        Transfer(from, 0, value);
    }

    function safeSub(uint a, uint b) internal returns (uint) {
        require(a >= b);
        return a - b;
    }
}
