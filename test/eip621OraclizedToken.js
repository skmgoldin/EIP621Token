const EIP621OraclizedToken = artifacts.require(`EIP621OraclizedToken.sol`)

contract(`EIP621OraclizedToken`, (accounts) => {
  const initialAmount = 1000
  const tokenName = `admiralCoin`
  const decimalUnits = 2
  const tokenSymbol = `MARK`
  const supplyOracle = accounts[1]

  const asOracle = function asOracle(fn, ...args) {
    let sendObject
    if(typeof(args[args.length - 1]) === Object) {
      sendObject = args[args.length - 1]
    } else {
      sendObject = {}
    }
    sendObject.from = supplyOracle
    return fn(...args, sendObject) 
  }

  const isEVMException = function isEVMException(err) {
    return err.toString().includes(`invalid opcode`)
  }

  describe(`As the oracle`, () => {
    it(`Should increase the supply by 10`, async () => {
      const amount = 10
      const to = accounts[9]

      const instance = await EIP621OraclizedToken.new(initialAmount,
        tokenName, decimalUnits, tokenSymbol, supplyOracle)
      await asOracle(instance.increaseSupply, amount, to)

      const recipientBalance = instance.balanceOf.call(to)
      const expectedBalance = amount.toString()

      const totalSupply = instance.totalSupply.call()
      const expectedSupply = (initialAmount + amount).toString()

      assert.strictEqual((await recipientBalance).toString(), expectedBalance)
      assert.strictEqual((await totalSupply).toString(), expectedSupply)
    })
  })


  describe(`As other than the oracle`, () => {
    it(`Should fail to increase the supply by 10`, async () => {
      const amount = 10
      const to = accounts[9]

      const instance = await EIP621OraclizedToken.new(initialAmount,
        tokenName, decimalUnits, tokenSymbol, supplyOracle)
      try {
        await instance.increaseSupply(amount, to)
        assert(false)
      } catch(err) { 
        assert(isEVMException(err))
      }
    })
  })
})
