/* solhint-disable-next-line compiler-fixed */
pragma solidity ^0.4.23;

contract Storage {
    uint public pos0;
    mapping(address => uint) public pos1;
    address public addr1 = 0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8;
    address public addr2 = 0x2a65Aca4D5fC5B5C859090a6c34d164135398226;

    constructor() public {
        pos0 = 1234;
        pos1[addr1] = 5678;
        pos1[addr2] = 5680;
    }
}