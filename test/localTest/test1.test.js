const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const {
    developmentChains,
    networkConfig,
} = require("../../helper-hardhat-config")
const { setNextBlockNumber } = require("../../utils/utils")

const parseEther = ethers.utils.parseEther
const formatEther = ethers.utils.formatEther
const getBalance = ethers.provider.getBalance

if (!developmentChains.includes(network.name)) {
    describe.skip
} else {
    describe("localTest Unit Tests", function () {
        let owner, user1, localTest
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()

            const localTestContract = await ethers.getContractFactory(
                "localTest"
            )
            localTest = await localTestContract.deploy()
        })

        describe("break it", () => {
            it("default attack", async function () {
                await localTest.createContract()
                let addr1 = await localTest.allPairs(0)
                console.log(addr1)

                let addr2 = await localTest.getContractAddress(
                    localTest.address
                )
                console.log(addr2)
            })
        })
    })
}
