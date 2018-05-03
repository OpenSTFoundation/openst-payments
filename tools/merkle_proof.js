"use strict";

const rootPrefix = '../..'
  , Web3 = require('web3')
  , EP  = require('eth-proof')
;

const blockHash = "0xb88b26c9a27608b54950d49726b5dccfe9c9e4df848f721c88c6a69e14e79052"
  , txHash = "0x5eee607cbc6840540bdac336ebfbada3635f4ce33dc138f569a03245b5f49d8b"
  , accountAddress = "032a546ee015210ace006901b1c8760a35cff04a"
  , chainDataPath = "/Users/Pepo/Documents/projects/openst-payments/mocha_test/scripts/st-poa/geth/chaindata"
  ;

const merkleProof = {

  transactionProof: function(){
    var epObject = new EP(new Web3.providers.HttpProvider("http://127.0.0.1:9546"), blockHash, chainDataPath);
    epObject.getTransactionProof(txHash).then((result)=>{
      console.log("transactionProof", result);
    });
  },

  accountProof: function(){
    var epObject = new EP(new Web3.providers.HttpProvider("http://127.0.0.1:9546"), blockHash, chainDataPath);
    epObject.getAccountProof(accountAddress).then((result)=>{
      console.log("accountProof", result);
    });
  },

  storageProof: function(){
    epObject.getStorageProof(accountAddress).then((result)=>{
      console.log("accountProof", result);
    });
  },


  perform: function(){
    const oThis = this
    ;
    oThis.transactionProof();
    oThis.accountProof();
    oThis.storageProof();
  }


};

merkleProof.perform();
