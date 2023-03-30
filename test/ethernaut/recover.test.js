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
const bytes32 = ethers.utils.formatBytes32String

if (!developmentChains.includes(network.name)) {
    describe.skip
} else {
    describe("ethernaut_gatekeeptwo Unit Tests", function () {
        let owner, user1, user2, Recovery, SimpleToken
        beforeEach(async () => {
            ;[owner, user1, user2] = await ethers.getSigners()
            const RecoveryContract = await ethers.getContractFactory("Recovery")
            Recovery = await RecoveryContract.deploy()

            SimpleToken = await ethers.getContractFactory("SimpleToken")
        })

        describe("break it", () => {
            it("default attack", async function () {
                await Recovery.generateToken("wtf", 10000000)
                // get lost address
                const lostAddress = await Recovery.calculateAddr(
                    Recovery.address,
                    1
                )
                // send ether to lost address
                await owner.sendTransaction({
                    to: lostAddress,
                    value: parseEther("0.001"),
                })
                expect(await getBalance(lostAddress)).to.equal(
                    parseEther("0.001")
                )
                // destory the contract
                let SimpleTokenCls = await SimpleToken.attach(lostAddress)
                let tx = () => SimpleTokenCls.destroy(owner.address)
                expect(await tx2bal(owner.address, tx)).to.equal(
                    parseEther("0.001")
                )
                expect(await getBalance(lostAddress)).to.equal(0)
            })
        })
    })
}
