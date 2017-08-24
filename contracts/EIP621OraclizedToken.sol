pragma solidity ^0.4.11;

import "./EIP621Token.sol";


contract EIP621OraclizedToken is EIP621Token {

    address public supplyOracle;
  
    modifier onlySupplyOracle {
        require(msg.sender == supplyOracle);
        _;
    }

    function EIP621OraclizedToken(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol,
        address _supplyOracle
    ) EIP621Token(
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

    function decreaseSupply(uint value, address from) public onlySupplyOracle {
        balances[from] = safeSub(balances[from], value);
        totalSupply = safeSub(totalSupply, value);

        Transfer(from, 0, value);
    }
}
