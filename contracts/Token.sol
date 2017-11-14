pragma solidity ^0.4.0;

contract Token {

    uint256 public totalSupply;
    uint256 public availableNumber;
    mapping (address => uint256) balances;
    
    address owner;
    uint price = 100; // 1 ETH = 100 Token

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);

    function Token(uint256 _totalSupply) public {
        totalSupply = _totalSupply;
        availableNumber = _totalSupply;
        owner = msg.sender;    
    }

    function () payable public {
        uint256 amount = msg.value * price / 1 ether;
        if (amount > availableNumber) {
            amount = availableNumber;
        } 

        require(amount > 0);

        balances[msg.sender] += amount;
        availableNumber -= amount;
        msg.sender.transfer(msg.value - amount*1 ether/price);
        Transfer(0x0, msg.sender,amount*1 ether/price);
    }

    function balanceOf(address _addr) public constant returns (uint256) {
        return balances[_addr];
    }
}