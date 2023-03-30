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
        let owner, user1, user2, NaughtCoin
        beforeEach(async () => {
            ;[owner, user1, user2] = await ethers.getSigners()
            const NaughtCoinContract = await ethers.getContractFactory(
                "NaughtCoin"
            )
            NaughtCoin = await NaughtCoinContract.deploy(owner.address)
        })

        describe("break it", () => {
            it("default attack", async function () {
                await NaughtCoin.approve(user1.address, parseEther("1000000"))
                await NaughtCoin.connect(user1).transferFrom(
                    owner.address,
                    user2.address,
                    parseEther("1000000")
                )
                expect(await NaughtCoin.balanceOf(owner.address)).to.equal(0)
                expect(await NaughtCoin.balanceOf(user2.address)).to.equal(
                    parseEther("1000000")
                )
            })
        })
    })
}
