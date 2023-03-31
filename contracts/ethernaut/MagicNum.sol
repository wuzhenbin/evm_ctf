// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Solver {
    function whatIsTheMeaningOfLife() external view returns (uint256);
}

contract MagicNum {
    address public solver;

    constructor() {}

    function setSolver(address _solver) public {
        solver = _solver;
    }

    function validate() public view returns (bool) {
        // Retrieve the solver from the instance.
        Solver solvers = Solver(solver);
        uint256 magic = solvers.whatIsTheMeaningOfLife();
        if (magic != 42) return false;

        // Require the solver to have at most 10 opcodes.
        uint256 size;
        assembly {
            size := extcodesize(solvers)
        }
        if (size > 10) return false;

        return true;
    }

    /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}

contract MagicNumExploit {
    function getSloveAddr() public returns (address solverAddr) {
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, shl(0x68, 0x69602A60005260206000F3600052600A6016F3))
            solverAddr := create(0, ptr, 0x13)
        }
    }
}

/* 
[runtimecode -> return 42]
PUSH1 0x42
PUSH1 0
MSTORE
PUSH1 32
PUSH1 0
RETURN
=>
0x602A60005260206000F3 return 0x42

[creation_code -> runtimecode]
00000000000000000000000000000000000000000000602a60005260206000f3
22bytes + 10bytes

PUSH10  0x602A60005260206000F3
PUSH1   00
MSTORE
PUSH1 0x0A  // 10bytes
PUSH1 0x16  // pos -> 22 => 0x16
RETURN
=>
0x69602A60005260206000F3600052600A6016F3 return 0x602A60005260206000F3

[deploy creation_code]
address deployedContractAddress;
assembly {
    let ptr := mload(0x40)
    mstore(ptr, shl(0x68, 0x69602A60005260206000F3600052600A6016F3))
    deployedContractAddress := create(0, ptr, 0x13)
}

shl(0x68, 0x69602A60005260206000F3600052600A6016F3)
一个槽位32bytes
0x0000000000000000000000000069602A60005260206000F3600052600A6016F3 一共19bytes(0x13)
需要移位 13bytes,  13*8 = 104 bit => 0x68
*/
