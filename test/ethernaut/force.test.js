const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const {
    developmentChains,
    networkConfig,
} = require("../../helper-hardhat-config")

const parseEther = ethers.utils.parseEther
const formatEther = ethers.utils.formatEther
const getBalance = ethers.provider.getBalance

if (!developmentChains.includes(network.name)) {
    describe.skip
} else {
    describe("ethernaut_token Unit Tests", function () {
        let owner, user1, Delegate, Delegation
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()

            const ForceContract = await ethers.getContractFactory("Force")
            const ForceAttackContract = await ethers.getContractFactory(
                "ForceAttack"
            )
            Force = await ForceContract.deploy()
            ForceAttack = await ForceAttackContract.deploy(Force.address)
        })

        describe("break it", () => {
            it("default attack", async function () {
                expect(await getBalance(Force.address)).to.equal(0)
                await ForceAttack.attack({ value: parseEther("1") })
                expect(await getBalance(Force.address)).to.equal(
                    parseEther("1")
                )
            })
        })
    })
}
