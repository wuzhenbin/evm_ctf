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
        let owner, user1, Denial, DenialAttack
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()
            const DenialContract = await ethers.getContractFactory("Denial")
            const DenialAttackContract = await ethers.getContractFactory(
                "DenialAttack"
            )
            Denial = await DenialContract.deploy()
            DenialAttack = await DenialAttackContract.deploy(Denial.address)

            await owner.sendTransaction({
                to: Denial.address,
                value: parseEther("10"),
            })
        })

        describe("break it", () => {
            it("default attack", async function () {
                expect(await Denial.partner()).to.equal(DenialAttack.address)

                // transtion can't go it
                await Denial.withdraw()
            })
        })
    })
}
