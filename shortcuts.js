const { increaseTime, tx2bal } = require("../../utils/utils")

await owner.sendTransaction({
    to: Reentrance.address,
    value: parseEther("10"),
})

let tx = () => Fallback.connect(user1).withdraw()
expect(await tx2bal(user1.address, tx)).to.equal(
    parseEther((10 + 0.0001).toString()).add(1)
)

import "@openzeppelin/contracts/utils/math/SafeMath.sol"
