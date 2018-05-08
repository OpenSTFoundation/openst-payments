"use strict";

/**
 *
 * This class would be used for executing airdrop pay.<br><br>
 *
 * @module services/airdrop/pay
 *
 */

const rootPrefix = '../..'
  , responseHelper = require(rootPrefix + '/lib/formatter/response')
  , basicHelper = require(rootPrefix + '/helpers/basic_helper')
  , logger = require(rootPrefix + '/helpers/custom_console_logger')
  , AirdropContractInteractKlass = require(rootPrefix + '/lib/contract_interact/airdrop')
  , paramErrorConfig = require(rootPrefix + '/config/param_error_config')
  , apiErrorConfig = require(rootPrefix + '/config/api_error_config')
;

const errorConfig = {
  param_error_config: paramErrorConfig,
  api_error_config: apiErrorConfig
};

/**
 * Constructor to create object of airdrop PayKlass
 *
 * @params {object} params -
 * @param {string} params.airdrop_contract_address - airdrop contract address
 * @param {number} params.chain_id - chain Id
 * @param {string} params.sender_worker_address - address of worker
 * @param {string} params.sender_worker_passphrase - passphrase of worker
 * @param {string} params.beneficiary_address - address of beneficiary account
 * @param {bignumber} params.transfer_amount - transfer amount (in wei)
 * @param {string} params.commission_beneficiary_address - address of commision beneficiary account
 * @param {bignumber} params.commission_amount - commission amount (in wei)
 * @param {string} params.currency - quote currency
 * @param {bignumber} params.intended_price_point - price point at which the pay is intended (in wei)
 * @param {string} params.spender - User address
 * @param {string} params.gas_price - gas price
 * @param {object} params.options - for params like returnType, tag.
 *
 * @constructor
 *
 */
const PayKlass = function (params) {
  const oThis = this;
  params = params || {};
  logger.debug("=======PayKlass.params=======");
  logger.debug(params.airdrop_contract_address, params.chain_id, params.sender_worker_address, params.beneficiary_address,
    params.transfer_amount, params.commission_beneficiary_address, params.commission_amount, params.currency, params.intended_price_point,
    params.spender, params.gas_price, params.options);

  oThis.airdropContractAddress = params.airdrop_contract_address;
  oThis.chainId = params.chain_id;
  oThis.senderWorkerAddress = params.sender_worker_address;
  oThis.senderWorkerPassphrase = params.sender_worker_passphrase;
  oThis.beneficiaryAddress = params.beneficiary_address;
  oThis.transferAmount = params.transfer_amount;
  oThis.commissionBeneficiaryAddress = params.commission_beneficiary_address;
  oThis.commissionAmount = params.commission_amount;
  oThis.currency = params.currency;
  oThis.intendedPricePoint = params.intended_price_point;
  oThis.spender = params.spender;
  oThis.gasPrice = params.gas_price;
  oThis.options = params.options;
};

PayKlass.prototype = {

  /**
   * Perform method
   *
   * @return {promise<result>}
   *
   */
  perform: async function () {
    const oThis = this
    ;

    try {
      var r = null;

      r = await oThis.validateParams();
      logger.debug("=======PayKlass.validateParams.result=======");
      logger.debug(r);
      if (r.isFailure()) return r;

      r = await oThis.pay();
      logger.debug("=======PayKlass.pay.result=======");
      logger.debug(r);

      return r;

    } catch (err) {
      let errorParams = {
        internal_error_identifier: 's_a_p_perform_1',
        api_error_identifier: 'unhandled_api_error',
        error_config: errorConfig,
        debug_options: { err: err }
      };
      logger.error(err.message);
      return responseHelper.error(errorParams);
    }

  },

  /**
   * Validation of params
   *
   * @return {result}
   *
   */
  validateParams: function () {
    const oThis = this
    ;
    if (!basicHelper.isAddressValid(oThis.airdropContractAddress)) {
      let errorParams = {
        internal_error_identifier: 's_a_p_validateParams_1',
        api_error_identifier: 'invalid_api_params',
        error_config: errorConfig,
        params_error_identifiers: ['airdrop_contract_address_invalid'],
        debug_options: {}
      };
      return responseHelper.paramValidationError(errorParams);
    }

    if (!oThis.gasPrice) {
      let errorParams = {
        internal_error_identifier: 's_a_p_validateParams_2',
        api_error_identifier: 'invalid_api_params',
        error_config: errorConfig,
        params_error_identifiers: ['gas_price_invalid'],
        debug_options: {}
      };
      return responseHelper.paramValidationError(errorParams);
    }

    if (!basicHelper.isValidChainId(oThis.chainId)) {
      let errorParams = {
        internal_error_identifier: 's_a_p_validateParams_3',
        api_error_identifier: 'invalid_api_params',
        error_config: errorConfig,
        params_error_identifiers: ['chain_id_invalid'],
        debug_options: {}
      };
      return responseHelper.error(errorParams);
    }

    return responseHelper.successWithData({});
  },

  /**
   * Airdrop pay
   *
   * @return {promise<result>}
   *
   */
  pay: function () {
    const oThis = this
    ;
    const AirdropContractInteractObject = new AirdropContractInteractKlass(
      oThis.airdropContractAddress,
      oThis.chainId
    );
    return AirdropContractInteractObject.pay(
      oThis.senderWorkerAddress,
      oThis.senderWorkerPassphrase,
      oThis.beneficiaryAddress,
      oThis.transferAmount,
      oThis.commissionBeneficiaryAddress,
      oThis.commissionAmount,
      oThis.currency,
      oThis.intendedPricePoint,
      oThis.spender,
      oThis.gasPrice,
      oThis.options
    );
  }

};

module.exports = PayKlass;