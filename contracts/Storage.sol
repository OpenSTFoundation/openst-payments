/* solhint-disable-next-line compiler-fixed */
pragma solidity ^0.4.17;

contract Storage {
    uint public pos0;
    mapping(address => uint) public pos1;

    function Storage() public {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}