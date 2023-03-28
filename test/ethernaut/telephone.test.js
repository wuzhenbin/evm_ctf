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
        let owner, user1, user2, Telephone, TelephoneAttack
        beforeEach(async () => {
            ;[owner, user1, user2] = await ethers.getSigners()

            const TelephoneContract = await ethers.getContractFactory(
                "Telephone"
            )
            const TelephoneAttackContract = await ethers.getContractFactory(
                "TelephoneAttack"
            )

            Telephone = await TelephoneContract.deploy()
            TelephoneAttack = await TelephoneAttackContract.deploy()
        })

        describe("break it", () => {
            it("default attack", async function () {
                await TelephoneAttack.connect(user1).exploit(Telephone.address)
                expect(await Telephone.owner()).to.equal(user1.address)
            })
        })
    })
}
