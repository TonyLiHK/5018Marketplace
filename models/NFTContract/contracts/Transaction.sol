// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.5 <0.9.0;


contract Transaction {

    mapping(address => uint) public balances;

    event Transfer(address sender, address receiver, uint amount);

    function transfer(address receiver, uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        emit Transfer(msg.sender, receiver, amount);
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }

    // In a Batch

}
