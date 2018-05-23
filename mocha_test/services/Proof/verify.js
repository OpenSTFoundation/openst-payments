/* global describe, it */

const chai = require('chai')
  , assert = chai.assert
  , Web3 = require('web3')
  , EP  = require('eth-proof')
  , RLP = require('rlp')
  , sha3 = require('js-sha3').keccak_256
;

const rootPrefix      = "../../.."
    , constants       = require(rootPrefix + '/mocha_test/lib/constants')
    , utils           = require(rootPrefix+'/mocha_test/lib/utils')
    , web3Provider = require(rootPrefix + '/lib/web3/providers/ws')
    , apiErrorConfig = require(rootPrefix + '/config/api_error_config')
    , proofContractAddres = '0x8e893e5cCdCD647f9b3f02b2960e71d8d4c29100'
    , Proof = require(rootPrefix + '/lib/contract_interact/proof')
;


const blockHash = "c0d885b77772b95c60abcfb4bc407a49022bea1e38593f7db6e0c68c32ca0495"
  , chainDataPath = "/Users/Deepesh/Documents/SimpleToken/workspace/openst-payments/mocha_test/scripts/st-poa-copy/st-poa/geth/chaindata"
  , web3HttpProvider = new Web3.providers.HttpProvider("http://127.0.0.1:9546")
  , epObjectWithoutChainData = new EP(web3HttpProvider)
  , epObjectWithChainData = new EP(web3HttpProvider, blockHash, chainDataPath)
;

Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;


describe('verifyAccountInBlock', function() {


  it('should fail when gasPrice is null', async function() {

    // eslint-disable-next-line no-invalid-this
    this.timeout(100000);


    const accountAddress = "C9a8ab238dB52B7295166b781B9FCD6656fF9EF9"
    ;

    console.log("\nStarting accountProofWithChainData");
    epObjectWithChainData.getAccountProof(accountAddress).then(async function(proof){
      console.log("\n===========accountProofWithChainData===========\n", proof);
      //var verifyResult = await EP.account(proof.address, proof.value, proof.parentNodes, proof.header, proof.blockHash);
      //console.log("verifyAccountProof Result:", verifyResult);


      console.log("RLP.encode(proof.address)", RLP.encode(proof.parentNodes));

      const senderAddress = constants.ops;
      const senderPassphrase = constants.opsPassphrase;


      console.log("countract account state", RLP.encode(proof.value))
      console.log("sha3(RLP.encode(proof.value))", sha3(RLP.encode(proof.value)))

      const value = "0x"+sha3(RLP.encode(proof.value)) ;
      const blockHash = "0x"+proof.blockHash.toString("hex") ;
      const address = "0x"+proof.address.toString("hex") ;
      const parentNodes = RLP.encode(proof.parentNodes);
      const stateRoot = "0x"+proof.header[3].toString("hex");


      console.log("value: ",value);
      console.log("blockHash: ",blockHash);
      console.log("address: ", address);
      console.log("parentNodes: ","0x"+parentNodes.toString("hex"));
      console.log("stateRoot: ",stateRoot);


      //var proof_rlp = RLP.encode(proof.parentNodes.map(a => RLP.decode(a)))
      //console.log("proof_rlp: ",proof_rlp);


      const proofObject = new Proof('0x795630F0d031596c0443a63EdfEA701aa4C3CD75', constants.chainId);

      // const vResult = await proofObject.verifybytes("0x"+parentNodes.toString("hex"), constants.gasUsed,
      //   constants.optionsReceipt,
      //   senderAddress,
      //   senderPassphrase);
      //
      // console.log("vResult: ",vResult);

      // const vResult1 = await proofObject.verifybytes32(blockHash, constants.gasUsed,
      //   constants.optionsReceipt,
      //   senderAddress,
      //   senderPassphrase);
      //
      // console.log("vResult: ",vResult1);

      const result = await proofObject.verifyAccountInBlock(
        value,
        address,
        "0x"+parentNodes.toString("hex"),
        stateRoot,
        180372500,
        constants.optionsReceipt,
        senderAddress,
        senderPassphrase);


    }).catch(function (reason) {
      console.log("reason: ",reason);
    });

  });

});
