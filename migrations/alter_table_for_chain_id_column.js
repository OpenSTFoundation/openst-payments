'use strict';

/**
 * This is Script is used to add chainId column in tables "airdrop_allocation_proof_details" and "airdrops"<br><br>
 *
 * Usage : node ./migrations/alter_table_for_chain_id_column.js config_strategy_path
 *
 * @module migrations/alter_table_for_chain_id_column.js
 */

const rootPrefix = '..',
  InstanceComposer = require(rootPrefix + '/instance_composer'),
  logger = require(rootPrefix + '/helpers/custom_console_logger');

require(rootPrefix + '/app/models/queryDb');

if (!process.argv[2]) {
  logger.error('Please pass the config strategy.');
  process.exit(1);
}

const configStrategy = require(process.argv[2]),
  instanceComposer = new InstanceComposer(configStrategy),
  coreConstants = instanceComposer.getCoreConstants(),
  QueryDBKlass = instanceComposer.getQueryDBKlass(),
  QueryDB = new QueryDBKlass(coreConstants.MYSQL_DATABASE);

/**
 * Create payments table
 *
 * @exports migrations/create_tables
 */
const alterTables = {
  perform: async function() {
    logger.win('\nStarting Alter Table ');

    const allQueries = alterTables.getQueries();
    let query = null;

    for (let i in allQueries) {
      query = allQueries[i];
      logger.win('\nRunning Query');
      logger.debug(query);
      let response = await QueryDB.migrate(query);
      logger.win('\nQuery Response');
      logger.debug(response);
    }

    process.exit(0);
  },

  getQueries: function() {
    let chainId = configStrategy.OST_UTILITY_CHAIN_ID;

    const alterAirdropAllocationProofDetailsTable =
      'ALTER TABLE `airdrop_allocation_proof_details` \n' +
      '   ADD `chain_id` bigint(20) NOT NULL \n' +
      '   DEFAULT ' +
      chainId +
      ' \n' +
      '   AFTER `id` ;';

    const alterAirdropAllocationProofUniqueIndex =
      'ALTER TABLE `airdrop_allocation_proof_details` \n' +
      '   DROP INDEX `UNIQUE_TRANSACTION_HASH` ,\n' +
      '   ADD UNIQUE KEY  `UNIQUE_TXN_HASH_CHAINID` (`transaction_hash` , `chain_id` ); ';

    const alterAirdropTable =
      'ALTER TABLE `airdrops` \n' +
      '   ADD `chain_id` bigint(20) NOT NULL \n' +
      '   DEFAULT ' +
      chainId +
      ' \n' +
      '   AFTER `id` ; ';

    const alterAirdropUniqueIndex =
      'ALTER TABLE `airdrops` \n' +
      '   DROP INDEX `UNIQUE_CONTRACT_ADDRESS` ,\n' +
      '   ADD UNIQUE KEY  `UNIQUE_CONTRACT_ADDR_CHAINID` (`contract_address` , `chain_id` ); ';

    return [
      alterAirdropAllocationProofDetailsTable,
      alterAirdropAllocationProofUniqueIndex,
      alterAirdropTable,
      alterAirdropUniqueIndex
    ];
  },

  usageDemo: function() {
    logger.info('usage:', 'node ./migrations/alter_table_for_chain_id_column.js defaultChainId');
    logger.info('* provided chain id will be used as a default value for all the existing rows.');
  }
};

module.exports = alterTables;
alterTables.perform();
