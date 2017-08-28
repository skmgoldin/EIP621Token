const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

const SECRETS = 'prod_secrets.json'
// first read in the secrets.json to get our mnemonic
let secrets;
let mnemonic;
if (fs.existsSync(SECRETS)) {
  secrets = JSON.parse(fs.readFileSync(SECRETS, 'utf8'));
  mnemonic = secrets.mnemonic;
} else {
  console.log('no secrets.json found. You can only deploy to the testrpc.');
  mnemonic = '';
}

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
    kovan: {
      provider: new HDWalletProvider(mnemonic, 'https://kovan.infura.io'),
      network_id: '*',
      gas: 4500000,
      gasPrice: 25000000000,
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io'),
      network_id: '*',
      gas: 4500000,
      gasPrice: 25000000000,
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
      network_id: 3
    },
    mainnet: {
      provider: new HDWalletProvider(mnemonic, 'https://mainnet.infura.io'),
      network_id: 1,
      gas: 4500000,
      gasPrice: 4000000000,
    },
  },
};
