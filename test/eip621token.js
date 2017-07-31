const EIP621Token = artifacts.require(`EIP621Token.sol`)

contract(`EIP621Token`, (accounts) => {
  const initialAmount = 1000
  const tokenName = `admiralCoin`
  const decimalUnits = 2
  const tokenSymbol = `MARK`

  it(`Should increase the supply by 10`, async () => {
    const increaseAmount = 10
    const to = accounts[9]

    try {
      const instance = await EIP621Token.new(initialAmount,
        tokenName, decimalUnits, tokenSymbol)
      await instance.increaseSupply(increaseAmount, to)

      const recipientBalance = await instance.balanceOf.call(to)
      const expectedBalance = increaseAmount.toString()
      assert.strictEqual(recipientBalance.toString(), expectedBalance)

      const totalSupply = await instance.totalSupply.call()
      const expectedSupply = (initialAmount + increaseAmount).toString()
      assert.strictEqual(totalSupply.toString(), expectedSupply)
    } catch(err) { throw new Error(err) }
  })

  it(`Should increase the supply by 10, then decrease it by 4`, async () => {
    const increaseAmount = 10
    const decreaseAmount = 4 
    const to = accounts[9]

    try {
      const instance = await EIP621Token.new(initialAmount,
        tokenName, decimalUnits, tokenSymbol)
      await instance.increaseSupply(increaseAmount, to)
      await instance.decreaseSupply(decreaseAmount, to)

      const recipientBalance = await instance.balanceOf.call(to)
      const expectedBalance = (increaseAmount - decreaseAmount).toString()
      assert.strictEqual(recipientBalance.toString(), expectedBalance)

      const totalSupply = await instance.totalSupply.call()
      const expectedSupply =
        (initialAmount + increaseAmount - decreaseAmount).toString()
      assert.strictEqual(totalSupply.toString(), expectedSupply)
    } catch(err) { throw new Error(err) }
  })
})
