const { NearProvider } = require('near-web3-provider');

const NEAR_TESTNET_URL = 'https://rpc.testnet.near.org';
const NEAR_LOCAL_NETWORK_ID = 'default';
const NEAR_LOCAL_ACCOUNT_ID = 'evm.demo.testnet';
const NEAR_LOCAL_EVM = 'evm.demo.testnet';

function NearTestNetProvider() {
  return new NearProvider({
    nodeUrl: NEAR_TESTNET_URL,
    networkId: NEAR_LOCAL_NETWORK_ID,
    masterAccountId: NEAR_LOCAL_ACCOUNT_ID,
    evmAccountId: NEAR_LOCAL_EVM,
  });
}

module.exports = {
  compilers: {
    solc: {
      version: '0.5.3',
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  },
  
  networks: {
    nearTestnet: {
      network_id: "*",
      skipDryRun: true,
      provider: () => NearTestNetProvider(),
    },
    development: {
      host: '127.0.0.1',
      port: 7545,
      gas: 6721975, // <-- Use this high gas value
      gasPrice: 1000000000,    // <-- Use this low gas price
      network_id: '*', // Match any network id
    },
  },

  mocha: {
    enableTimeouts: false,
    before_timeout: 120000 // 2min
  }
}
