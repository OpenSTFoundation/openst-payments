/*
 * @title MerklePatriciaVerifier
 * @author Sam Mayo (sammayo888@gmail.com)
 *
 * @dev Library for verifing merkle patricia proofs.
 */

pragma solidity ^0.4.19;

import "./util.sol";
import "./MerklePatriciaProof.sol";

 contract Proof  is Util {

    constructor()
    public
    {

    }
    // proof for account
    function verifyAccountInBlock(bytes32 value, address addr, bytes parentNodes, bytes32 stateRoot) public returns (bool){
      bytes memory path = bytes32ToBytes(keccak256(addr));
      require(MerklePatriciaProof.verify(value, path, parentNodes, stateRoot));
      return true;
    }



   // proof for account
   function verifybytes32(bytes32 value) public returns (bool){
     return true;
   }
   function verifyAddress(address addr) public returns (bool){
     return true;
   }
   function verifybytes(bytes parentNodes) public returns (bool){
     return true;
   }
}
