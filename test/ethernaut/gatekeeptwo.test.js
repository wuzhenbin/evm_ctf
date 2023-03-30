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
        let owner, GatekeeperTwo, GatekeeperTwoAttack
        beforeEach(async () => {
            ;[owner] = await ethers.getSigners()
            const GatekeeperTwoContract = await ethers.getContractFactory(
                "GatekeeperTwo"
            )
            GatekeeperTwo = await GatekeeperTwoContract.deploy()

            const GatekeeperTwoAttackContract = await ethers.getContractFactory(
                "GatekeeperTwoAttack"
            )
            GatekeeperTwoAttack = await GatekeeperTwoAttackContract.deploy(
                GatekeeperTwo.address
            )
        })

        describe("break it", () => {
            it("default attack", async function () {
                expect(await GatekeeperTwo.entrant()).to.equal(owner.address)
            })
        })
    })
}
