# EIP621 Tokens

[ ![Codeship Status for skmgoldin/EIP621Token](https://app.codeship.com/projects/0215fa60-586c-0135-b841-36ffffe01415/status?branch=master)](https://app.codeship.com/projects/236295)

The tokens in this repo implement [EIP621](https://github.com/ethereum/EIPs/pull/621), which includes facility for increasing and decreasing a token's total supply. There are two implemented tokens in the repo, [EIP621Token](https://github.com/skmgoldin/EIP621Token/blob/master/contracts/EIP621Token.sol) and [EIP621OraclizedToken](https://github.com/skmgoldin/EIP621Token/blob/master/contracts/EIP621OraclizedToken.sol).

In EIP621Token, the increase and decrease supply functions are public methods. This adheres to the spec strictly speaking, but may not be super useful.

In EIP621OraclizedToken, a supply oracle is set in the contract's constructor which may increase and decrease the supply.
