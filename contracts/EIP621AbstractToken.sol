pragma solidity 0.4.13;

import "tokens/HumanStandardToken.sol";


contract EIP621AbstractToken is HumanStandardToken {
    function increaseSupply(uint value, address to) public;

    function safeAdd(uint a, uint b) internal returns (uint);

    function decreaseSupply(uint value, address from) public;

    function safeSub(uint a, uint b) internal returns (uint);
}
