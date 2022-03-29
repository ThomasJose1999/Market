/* hardhat.config.js */
require('dotenv').config({ path: ".env.local" })
require("@nomiclabs/hardhat-waffle")

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    rinkeby: {
      url: process.env.rpc_url,
      chainId: 4,
      accounts: [process.env.pvt_key]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
