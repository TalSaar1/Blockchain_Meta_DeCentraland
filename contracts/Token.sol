pragma solidity ^0.5.0;

contract Token {
    string public name;
    string public symbol;
    uint256 public decimal;
    uint256 public totalSupply;
    uint256 public unitsOneEthCanBuy ;
    address payable public fundsWallet;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    mapping(address => uint256) public balances;
    mapping(address => mapping (address => uint256)) public allowance;

    constructor(string memory _name, string memory _symbol, uint256 _decimal, uint256 _unitsOneEthCanBuy, uint256 _totalSupply) public {
        name = _name;
        symbol = _symbol;
        decimal = _decimal;
        totalSupply = _totalSupply * (10 ** decimal);
        unitsOneEthCanBuy = _unitsOneEthCanBuy;
        fundsWallet = msg.sender;
        balances[fundsWallet] = totalSupply;

        emit Transfer(address(0), fundsWallet, totalSupply);
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function buyTokens() public payable {
        uint256 amount = msg.value * unitsOneEthCanBuy;
        require(balances[fundsWallet] >= amount);

        balances[fundsWallet] = balances[fundsWallet] - amount;
        balances[msg.sender] = balances[msg.sender] + amount;

        emit Transfer(fundsWallet, msg.sender, amount);

        fundsWallet.transfer(msg.value);                               
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value, "Not enough tokens to transfer");
        
        _transfer(msg.sender, _to, _value);

        return true;
    }

    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_to != address(0));

        balances[_from] -= _value;
        balances[_to] += _value;

        emit Transfer(_from, _to, _value);
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_spender != address(0));

        allowance[msg.sender][_spender] = _value;
        
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(allowance[_from][msg.sender] >= _value, "Not approved to spend");
        require(balances[_from] >= _value, "Not enough tokens to transfer");
        
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);

        return true;
    }
}