/* solhint-disable-next-line compiler-fixed */
pragma solidity ^0.4.23;

contract Storage {
    event Test(bytes32 sih1, bytes32 sih2);

    string public pos0;
    mapping(bytes32 => string) public pos1;

    bytes32 public sih1 = 0x14bb2bf372bbfc1de82d7a80510e8bf9c0735e1982c822f370f0882fc1d4f607;
    bytes32 public sih2 = 0xa20cef82a08a0952b1989262b53492c68a64dc230a885aff8c38dc9bd067a8d0;

    constructor() public {
        pos0 = '1234';
        pos1[sih1] = '5678';
        pos1[sih2] = '5680803456';
    }
}