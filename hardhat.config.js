require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")
require("@nomicfoundation/hardhat-toolbox")
require("@openzeppelin/hardhat-upgrades")
require("@nomicfoundation/hardhat-chai-matchers")
// require("hardhat-storage-layout")

// const PRIVATE_KEY = process.env.PRIVATE_KEY
// const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const MAIN_RPC_URL = process.env.MAIN_RPC_URL

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.17",
            },
            {
                version: "0.8.0",
            },
            {
                version: "0.6.0",
            },
        ],
    },
    defaultNetwork: "hardhat",
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
    networks: {
        hardhat: {
            chainId: 31337,
            // forking: {
            //     url: MAIN_RPC_URL,
            // },
        },
        // goerli: {
        //     url: GOERLI_RPC_URL,
        //     accounts: [PRIVATE_KEY],
        //     chainId: 5,
        //     blockConfirmations: 6,
        // },
    },
}
