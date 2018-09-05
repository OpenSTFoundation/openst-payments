'use strict';
/**
 * Dynamo DB init
 *
 * @module tools/dynamo_db_init
 */

const rootPrefix = '..',
  logger = require(rootPrefix + '/helpers/custom_console_logger'),
  InstanceComposer = require(rootPrefix + '/instance_composer'),
  configStrategy = require(rootPrefix + '/mocha_test/scripts/config_strategy');

require(rootPrefix + '/lib/providers/storage');

/**
 * Dynamo db init
 *
 * @constructor
 */
const DynamoDBInit = function() {};

DynamoDBInit.prototype = {
  perform: async function() {
    const oThis = this,
      instanceComposer = new InstanceComposer(configStrategy),
      storageProvider = instanceComposer.getStorageProvider(),
      openSTStorage = storageProvider.getInstance();

    // createShard
    logger.info('* Creating shard for token balance model.');
    await new openSTStorage.model.TokenBalance({}).createShard('tokenBalancesShard1');
  }
};

new DynamoDBInit().perform();
