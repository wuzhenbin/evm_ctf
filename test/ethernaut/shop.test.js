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
    describe("ethernaut_telephone Unit Tests", function () {
        let owner, user1, user2, Shop, ShopAttack
        beforeEach(async () => {
            ;[owner, user1, user2] = await ethers.getSigners()

            const ShopContract = await ethers.getContractFactory("Shop")
            const ShopAttackContract = await ethers.getContractFactory(
                "ShopAttack"
            )

            Shop = await ShopContract.deploy()
            ShopAttack = await ShopAttackContract.deploy(Shop.address)
        })

        describe("break it", () => {
            it("default attack", async function () {
                await ShopAttack.buy()
                expect(await Shop.price()).to.equal(1)
                expect(await Shop.isSold()).to.equal(true)
            })
        })
    })
}
