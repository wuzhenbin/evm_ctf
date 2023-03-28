const { ethers } = require("hardhat")

const parseEther = ethers.utils.parseEther
const formatEther = ethers.utils.formatEther
const getBalance = ethers.provider.getBalance

const getBlockTime = async () => {
    let blockNumBefore = await ethers.provider.getBlockNumber()
    let blockBefore = await ethers.provider.getBlock(blockNumBefore)
    return blockBefore.timestamp
}

const increaseTime = async (increaseTime) => {
    await network.provider.send("evm_increaseTime", [increaseTime])
    await network.provider.send("evm_mine")
}

const setNextBlockNumber = async () => {
    await network.provider.send("evm_mine")
}

const tx2bal = async (addr, txf, gas = true) => {
    let balance = await getBalance(addr)
    let tx = await txf()
    const receipt = await tx.wait()
    if (gas) {
        const gasFee = receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice)
        balance = (await getBalance(addr)).sub(balance).add(gasFee)
    } else {
        balance = (await getBalance(addr)).sub(balance)
    }

    return balance
}

// 多签 按顺序 从小到大签
const getSignature = async (users, hash) => {
    // sort the users
    let newSort = users.sort((a, b) => a.address - b.address)
    let signature = "0x"

    for (let i = 0; i < newSort.length; i++) {
        let sigItem = await newSort[i].signMessage(ethers.utils.arrayify(hash))
        signature = `${signature}${sigItem.replace("0x", "")}`
    }

    return signature
}

module.exports = {
    tx2bal,
    getBlockTime,
    setNextBlockNumber,
    increaseTime,
    getSignature,
}
