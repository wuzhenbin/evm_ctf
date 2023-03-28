const developmentChains = ["hardhat", "localhost", "ganache"]
const { ethers } = require("hardhat")

const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    },
    5: {
        name: "goerli",
    },
}

module.exports = {
    networkConfig,
    developmentChains,
}
