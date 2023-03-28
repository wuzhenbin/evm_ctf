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
        let owner, user1, EtherNautToken
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()

            const EtherNautTokenContract = await ethers.getContractFactory(
                "EtherNautToken"
            )
            EtherNautToken = await EtherNautTokenContract.deploy(20)
        })

        describe("break it", () => {
            it("default attack", async function () {
                expect(await EtherNautToken.balanceOf(owner.address)).to.equal(
                    20
                )
                await EtherNautToken.transfer(user1.address, 21)
                expect(await EtherNautToken.balanceOf(user1.address)).to.equal(
                    21
                )
            })
        })
    })
}
