"use strict";

const rootPrefix = '../..'
  , baseCache = require(rootPrefix + '/lib/cache_management/base')
  , UserAirdropDetailKlass = require(rootPrefix + '/app/models/user_airdrop_detail')
  , userAirdropDetailModel = new UserAirdropDetailKlass()
  , coreConstants = require(rootPrefix + '/config/core_constants')
  , responseHelper = require(rootPrefix + '/lib/formatter/response')
  , basicHelper = require(rootPrefix + '/helpers/basic')
  , util = require(rootPrefix + '/lib/util')
;

/**
 * @constructor
 * @augments userAirdropDetailCache
 *
 * @param {Object} params - cache key generation & expiry related params
 *
 */
const userAirdropDetailCache = module.exports = function (params) {

  const oThis = this;

  oThis.userAddresses = params['userAddresses'];

  baseCache.call(this, params);

  oThis.useObject = true;

};

userAirdropDetailCache.prototype = Object.create(baseCache.prototype);

userAirdropDetailCache.prototype.constructor = userAirdropDetailCache;

/**
 * set cache key
 *
 * @return {Object}
 */
userAirdropDetailCache.prototype.setCacheKeys = function () {

  const oThis = this;

  oThis.cacheKeys = {};
  for (var i = 0; i < oThis.userAddresses.length; i++) {
    oThis.cacheKeys["l_cm_uad_" + oThis.userAddresses[i]] = oThis.userAddresses[i];
  }

  return oThis.cacheKeys;

};

/**
 * set cache expiry in oThis.cacheExpiry and return it
 *
 * @return {Number}
 */
userAirdropDetailCache.prototype.setCacheExpiry = function () {

  const oThis = this;

  oThis.cacheExpiry = 300 // 5 minutes ;

  return oThis.cacheExpiry;

};

/**
 * fetch data from source
 *
 * @return {Result}
 */
userAirdropDetailCache.prototype.fetchDataFromSource = async function (cacheIds) {

  if (!cacheIds) {
    return responseHelper.error(
      'l_cm_uad_1', 'blank addresses'
    );
  }

  const queryResponse = await userAirdropDetailModel.getByUserAddresses(cacheIds);

  if (queryResponse.isSuccess()) {
    return queryResponse;
  } else {
    return responseHelper.error(
      'l_cm_uad_2', 'No Data found'
    );
  }

};