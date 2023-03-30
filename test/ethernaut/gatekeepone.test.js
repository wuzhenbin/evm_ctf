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
    describe("ethernaut_gatekeepone Unit Tests", function () {
        let owner, user1, GatekeeperOne, GatekeeperOneAttack
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()
            const GatekeeperOneContract = await ethers.getContractFactory(
                "GatekeeperOne"
            )
            GatekeeperOne = await GatekeeperOneContract.deploy()
            const GatekeeperOneAttackContract = await ethers.getContractFactory(
                "GatekeeperOneAttack"
            )
            GatekeeperOneAttack = await GatekeeperOneAttackContract.deploy()
        })

        describe("break it", () => {
            it("default attack", async function () {
                await GatekeeperOneAttack.enter(GatekeeperOne.address)
                expect(await GatekeeperOne.entrant()).to.equal(owner.address)
            })
        })
    })
}
