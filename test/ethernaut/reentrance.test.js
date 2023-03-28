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
    describe("ethernaut_reentrance Unit Tests", function () {
        let owner, user1, Reentrance, ReentranceAttack
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()

            const ReentranceContract = await ethers.getContractFactory(
                "Reentrance"
            )
            const ReentranceAttackContract = await ethers.getContractFactory(
                "ReentranceAttack"
            )

            Reentrance = await ReentranceContract.deploy()
            ReentranceAttack = await ReentranceAttackContract.deploy(
                Reentrance.address
            )

            await owner.sendTransaction({
                to: Reentrance.address,
                value: parseEther("10"),
            })
        })

        describe("break it", () => {
            it("default attack", async function () {
                expect(await getBalance(Reentrance.address)).to.equal(
                    parseEther("10")
                )

                await ReentranceAttack.attack({ value: parseEther("1") })

                expect(await getBalance(Reentrance.address)).to.equal(0)
                expect(await getBalance(ReentranceAttack.address)).to.equal(
                    parseEther("11")
                )
                let res = await Reentrance.balanceOf(ReentranceAttack.address)
                console.log(res.toString())
            })
        })
    })
}
