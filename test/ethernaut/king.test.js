const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const {
    developmentChains,
    networkConfig,
} = require("../../helper-hardhat-config")
const { tx2bal } = require("../../utils/utils")

const parseEther = ethers.utils.parseEther
const formatEther = ethers.utils.formatEther
const getBalance = ethers.provider.getBalance

if (!developmentChains.includes(network.name)) {
    describe.skip
} else {
    describe("ethernaut_king Unit Tests", function () {
        let owner, user1, user2, user3, King, KingAttack
        beforeEach(async () => {
            ;[owner, user1, user2, user3] = await ethers.getSigners()

            const KingContract = await ethers.getContractFactory("King")
            const KingAttackContract = await ethers.getContractFactory(
                "KingAttack"
            )

            King = await KingContract.deploy({ value: parseEther("0.1") })
            KingAttack = await KingAttackContract.deploy(King.address)
        })

        describe("break it", () => {
            it("default attack", async function () {
                expect(await getBalance(King.address)).to.equal(
                    parseEther("0.1")
                )
                await expect(
                    user1.sendTransaction({
                        from: user1.address,
                        to: King.address,
                        value: parseEther("0.05"),
                    })
                ).to.be.reverted

                // user1 send 0.2 eth, owner get 0.2 eth
                let owner_get = await tx2bal(
                    owner.address,
                    () => {
                        return user1.sendTransaction({
                            from: user1.address,
                            to: King.address,
                            value: parseEther("0.2"),
                        })
                    },
                    false
                )
                expect(owner_get).to.equal(parseEther("0.2"))

                // user2 attack
                await KingAttack.connect(user2).attack({
                    value: parseEther("0.3"),
                })

                // user3 try fail
                await expect(
                    user3.sendTransaction({
                        from: user3.address,
                        to: King.address,
                        value: parseEther("0.4"),
                    })
                ).to.be.reverted
            })
        })
    })
}
