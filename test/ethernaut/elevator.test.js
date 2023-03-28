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

            const ElevatorContract = await ethers.getContractFactory("Elevator")
            const ExploiterAttackContract = await ethers.getContractFactory(
                "Exploiter"
            )

            Elevator = await ElevatorContract.deploy()
            Exploiter = await ExploiterAttackContract.deploy(Elevator.address)
        })

        describe("break it", () => {
            it("default attack", async function () {
                await Exploiter.goTo(1)

                expect(await Elevator.top()).to.equal(true)
            })
        })
    })
}
