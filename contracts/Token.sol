pragma solidity ^0.4.0;

contract Token {
    uint256 public totalSupply;
    uint256 public issuedSupply;
    mapping (address => uint256) balances;
    
    address owner;
    uint price = 100; // 1 ETH = 100 Token

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);

    function Token(uint256 _totalSupply) public {
        totalSupply = _totalSupply;
        owner = msg.sender;    
    }

    function () payable public {
        uint256 amount = msg.value * price / 1 ether;
        uint256 canIssue = totalSupply - issuedSupply;
        
        require(canIssue > 0);
        
        if (amount > canIssue) {
            amount = canIssue;
        } 
        
        balances[msg.sender] += amount;
        msg.sender.transfer(msg.value - amount*1 ether/100);
        Transfer(0x0, msg.sender,amount*1 ether/100);
        Transfer(0x0, msg.sender,msg.value);
    }

    function balanceOf(address _addr) public constant returns (uint256) {
        return balances[_addr];
    }
}