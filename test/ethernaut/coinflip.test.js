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
    describe("ethernaut_coinflip Unit Tests", function () {
        let owner, user1, CoinFlip, CoinFlipAttack
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()

            const CoinFlipContract = await ethers.getContractFactory("CoinFlip")
            const CoinFlipAttackContract = await ethers.getContractFactory(
                "CoinFlipAttack"
            )

            CoinFlip = await CoinFlipContract.deploy()
            CoinFlipAttack = await CoinFlipAttackContract.deploy(
                CoinFlip.address
            )
        })

        describe("break it", () => {
            it("default attack", async function () {
                // init
                expect(await CoinFlip.consecutiveWins()).to.equal(0)

                while (
                    parseInt((await CoinFlip.consecutiveWins()).toString()) < 10
                ) {
                    await CoinFlipAttack.exploitLevel()
                    await setNextBlockNumber()
                }
                expect(await CoinFlip.consecutiveWins()).to.equal(10)
            })
        })
    })
}
