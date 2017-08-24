pragma solidity ^0.4.11;

import "./EIP621AbstractToken.sol";


contract EIP621Token is EIP621AbstractToken {

    function EIP621Token(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
    ) HumanStandardToken(
        _initialAmount,
        _tokenName,
        _decimalUnits,
        _tokenSymbol
    ) 
    {}

    function increaseSupply(uint value, address to) public {
        totalSupply = safeAdd(totalSupply, value);
        balances[to] = safeAdd(balances[to], value);

        Transfer(0, to, value);
    }

    function safeAdd(uint a, uint b) internal returns (uint) {
        require(a + b >= a);
        return a + b;
    }

    function decreaseSupply(uint value, address from) public {
        balances[from] = safeSub(balances[from], value);
        totalSupply = safeSub(totalSupply, value);

        Transfer(from, 0, value);
    }

    function safeSub(uint a, uint b) internal returns (uint) {
        require(a >= b);
        return a - b;
    }
}
