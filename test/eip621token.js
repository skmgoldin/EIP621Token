const EIP621Token = artifacts.require(`EIP621Token.sol`)

contract(`EIP621Token`, (accounts) => {
  const initialAmount = 1000
  const tokenName = `admiralCoin`
  const decimalUnits = 2
  const tokenSymbol = `MARK`
  const defaultTo = accounts[1]

  it(`Should increase the supply by 10`, async () => {
    const increaseAmount = 10

    const instance = await EIP621Token.new(initialAmount,
      tokenName, decimalUnits, tokenSymbol)
    await instance.increaseSupply(increaseAmount, defaultTo)

    // Await on use
    const recipientBalance = instance.balanceOf.call(defaultTo)
    const expectedBalance = increaseAmount.toString()

    // Await on use
    const totalSupply = instance.totalSupply.call()
    const expectedSupply = (initialAmount + increaseAmount).toString()

    assert.strictEqual((await recipientBalance).toString(), expectedBalance)
    assert.strictEqual((await totalSupply).toString(), expectedSupply)
  })

  it(`Should increase the supply by 10, then decrease it by 4`, async () => {
    const increaseAmount = 10
    const decreaseAmount = 4 
    const totalChange = increaseAmount - decreaseAmount

    const instance = await EIP621Token.new(initialAmount,
      tokenName, decimalUnits, tokenSymbol)
    await instance.increaseSupply(increaseAmount, defaultTo)
    await instance.decreaseSupply(decreaseAmount, defaultTo)

    // Await on use
    const recipientBalance = instance.balanceOf.call(defaultTo)
    const expectedBalance = (totalChange).toString(10)

    // Await on use
    const totalSupply = instance.totalSupply.call()
    const expectedSupply =
      (initialAmount + totalChange).toString(10)

    assert.strictEqual((await recipientBalance).toString(10), expectedBalance)
    assert.strictEqual((await totalSupply).toString(10), expectedSupply)
  })
})
