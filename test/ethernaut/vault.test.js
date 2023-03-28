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
        let owner, user1, Vault
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()

            const VaultContract = await ethers.getContractFactory("Vault")

            const pass = "qweasd"
            const bytes32 = ethers.utils.formatBytes32String(pass)

            Vault = await VaultContract.deploy(bytes32)
        })

        describe("break it", () => {
            it("default attack", async function () {
                expect(await Vault.locked()).to.equal(true)

                let password = await ethers.provider.getStorageAt(
                    Vault.address,
                    1
                )
                await Vault.unlock(password)
                expect(await Vault.locked()).to.equal(false)
            })
        })
    })
}
