"use strict";

/**
 *
 * This is a utility file which would be used for executing all methods on Proof contract.<br><br>
 *
 * @module lib/contract_interact/proof
 *
 */
const BigNumber = require('bignumber.js')
;

const rootPrefix = '../..'
  , basicHelper = require(rootPrefix + '/helpers/basic_helper')
  , coreAddresses = require(rootPrefix + '/config/core_addresses')
  , coreConstants = require(rootPrefix + '/config/core_constants')
  , helper = require(rootPrefix + '/lib/contract_interact/helper')
  , responseHelper = require(rootPrefix + '/lib/formatter/response')
  , web3Provider = require(rootPrefix + '/lib/web3/providers/ws')
  , logger = require(rootPrefix + '/helpers/custom_console_logger')
  , notificationGlobalConstant = require(rootPrefix + '/lib/global_constant/notification')
  , gasLimitGlobalConstant = require(rootPrefix + '/lib/global_constant/gas_limit')
  , paramErrorConfig = require(rootPrefix + '/config/param_error_config')
  , apiErrorConfig = require(rootPrefix + '/config/api_error_config')
;

const errorConfig = {
  param_error_config: paramErrorConfig,
  api_error_config: apiErrorConfig
};

const contractName = 'proof'
  , contractAbi = coreAddresses.getAbiForContract(contractName)
  , currContract = new web3Provider.eth.Contract(contractAbi)
;

/**
 * Proof contract interact class constructor
 *
 * @constructor
 *
 */
const Proof = module.exports = function (proofContractAddress, chainId) {
  const oThis = this
  ;
  oThis.contractAddress = proofContractAddress;
  oThis.chainID = chainId;

};

Proof.prototype = {

  verifyAccountInBlock: async function(value, addr, parentNodes, stateRoot, gasPrice,  options, senderAddress, senderPassphrase) {

    const oThis = this
    ;

    try {
      const returnType = basicHelper.getReturnType(options.returnType)
        , transactionObject = currContract.methods.verifyAccountInBlock(value, addr, parentNodes, stateRoot);

      const notificationData = helper.getNotificationData(
        ['account.proof'],
        notificationGlobalConstant.publisher(),
        'verifyAccountInBlock',
        contractName,
        oThis.contractAddress,
        web3Provider,
        oThis.chainId,
        options);

      const params = {
        transactionObject: transactionObject,
        notificationData: notificationData,
        senderAddress: senderAddress,
        senderPassphrase: senderPassphrase,
        contractAddress: oThis.contractAddress,
        gasPrice: gasPrice,
        gasLimit: 180372500,
        web3Provider: web3Provider,
        successCallback: null,
        failCallback: null,
        errorCode: "l_ci_p_verifyAccountInBlock_1"
      };

      return Promise.resolve(helper.performSend(params, returnType));
    } catch(err) {
      let errorParams = {
        internal_error_identifier: 'l_ci_p_verifyAccountInBlock_2',
        api_error_identifier: 'unhandled_api_error',
        error_config: errorConfig,
        debug_options: {}
      };
      logger.error('lib/contract_interact/proof.js:verifyAccountInBlock inside catch:', err);
      return Promise.resolve(responseHelper.error(errorParams));
    }
  },


  verifybytes: async function(value, gasPrice,  options, senderAddress, senderPassphrase) {

    const oThis = this
    ;

    try {
      const returnType = basicHelper.getReturnType(options.returnType)
        , transactionObject = currContract.methods.verifybytes(value);

      const notificationData = helper.getNotificationData(
        ['account.proof'],
        notificationGlobalConstant.publisher(),
        'verifyAccountInBlock',
        contractName,
        oThis.contractAddress,
        web3Provider,
        oThis.chainId,
        options);

      const params = {
        transactionObject: transactionObject,
        notificationData: notificationData,
        senderAddress: senderAddress,
        senderPassphrase: senderPassphrase,
        contractAddress: oThis.contractAddress,
        gasPrice: gasPrice,
        gasLimit: gasLimitGlobalConstant.setWorker(),
        web3Provider: web3Provider,
        successCallback: null,
        failCallback: null,
        errorCode: "l_ci_p_verifyAccountInBlock_1"
      };

      return Promise.resolve(helper.performSend(params, returnType));
    } catch(err) {
      let errorParams = {
        internal_error_identifier: 'l_ci_p_verifyAccountInBlock_2',
        api_error_identifier: 'unhandled_api_error',
        error_config: errorConfig,
        debug_options: {}
      };
      logger.error('lib/contract_interact/proof.js:verifyAccountInBlock inside catch:', err);
      return Promise.resolve(responseHelper.error(errorParams));
    }
  },


  verifybytes32: async function(value, gasPrice,  options, senderAddress, senderPassphrase) {

    const oThis = this
    ;

    try {
      const returnType = basicHelper.getReturnType(options.returnType)
        , transactionObject = currContract.methods.verifybytes32(value);

      const notificationData = helper.getNotificationData(
        ['account.proof'],
        notificationGlobalConstant.publisher(),
        'verifyAccountInBlock',
        contractName,
        oThis.contractAddress,
        web3Provider,
        oThis.chainId,
        options);

      const params = {
        transactionObject: transactionObject,
        notificationData: notificationData,
        senderAddress: senderAddress,
        senderPassphrase: senderPassphrase,
        contractAddress: oThis.contractAddress,
        gasPrice: gasPrice,
        gasLimit: gasLimitGlobalConstant.setWorker(),
        web3Provider: web3Provider,
        successCallback: null,
        failCallback: null,
        errorCode: "l_ci_p_verifyAccountInBlock_1"
      };

      return Promise.resolve(helper.performSend(params, returnType));
    } catch(err) {
      let errorParams = {
        internal_error_identifier: 'l_ci_p_verifyAccountInBlock_2',
        api_error_identifier: 'unhandled_api_error',
        error_config: errorConfig,
        debug_options: {}
      };
      logger.error('lib/contract_interact/proof.js:verifyAccountInBlock inside catch:', err);
      return Promise.resolve(responseHelper.error(errorParams));
    }
  },



};
