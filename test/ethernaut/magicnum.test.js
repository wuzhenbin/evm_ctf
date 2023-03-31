const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const {
    developmentChains,
    networkConfig,
} = require("../../helper-hardhat-config")

const parseEther = ethers.utils.parseEther
const formatEther = ethers.utils.formatEther
const getBalance = ethers.provider.getBalance
const bytes32 = ethers.utils.formatBytes32String

if (!developmentChains.includes(network.name)) {
    describe.skip
} else {
    describe("ethernaut_gatekeeptwo Unit Tests", function () {
        let owner, MagicNumExploit
        beforeEach(async () => {
            ;[owner] = await ethers.getSigners()
            const MagicNumContract = await ethers.getContractFactory("MagicNum")
            const MagicNumExploitContract = await ethers.getContractFactory(
                "MagicNumExploit"
            )
            MagicNum = await MagicNumContract.deploy()
            MagicNumExploit = await MagicNumExploitContract.deploy()
        })

        describe("break it", () => {
            it("default attack", async function () {
                let addr = await MagicNumExploit.callStatic.getSloveAddr()
                await MagicNumExploit.getSloveAddr()
                await MagicNum.setSolver(addr)
                expect(await MagicNum.validate()).to.equal(true)
            })
        })
    })
}
