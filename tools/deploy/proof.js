"use strict";

/**
 * This is script for deploying Pricer contract on any chain.<br><br>
 *
 *   Prerequisite:
 *    <ol>
 *       <li>Deployer Address</li>
 *     </ol>
 *
 *   These are the following steps:<br>
 *     <ol>
 *       <li>Deploy Airdrop contract</li>
 *     </ol>
 *
 *
 * @module tools/deploy/pricer
 */

const readline = require('readline')
  , rootPrefix = '../..'
  , coreAddresses = require(rootPrefix + '/config/core_addresses')
  , logger = require(rootPrefix + '/helpers/custom_console_logger')
  , returnTypes = require(rootPrefix + "/lib/global_constant/return_types")
  , openstPayment = require(rootPrefix + '/index')
  , DeployProofKlass = openstPayment.services.deploy.proof
;

// Different addresses used for deployment
const deployerName = "deployer"
  , deployerAddress = coreAddresses.getAddressForUser(deployerName)
  , deployerPassphrase = coreAddresses.getPassphraseForUser(deployerName)
;

const opsName = "ops";
const opsAddress = coreAddresses.getAddressForUser(opsName);


/**
 * It is the main performer method of this deployment script
 *
 * @param {Array} arguments
 *
 * @return {}
 */
async function performer(argv) {


  const deployOptions = {returnType: returnTypes.transactionReceipt()}
  ;
  const DeployProofObject = new DeployProofKlass({
    gas_price: 0x12A05F200,
    options: deployOptions
  });
  const deployResult =  await DeployProofObject.perform();

  if (deployResult.isSuccess()) {
    const contractAddress = deployResult.data.transaction_receipt.contractAddress;
    logger.win("contractAddress: " + contractAddress);

  } else {
    logger.error("Error deploying contract");
    logger.error(deployResult);
  }
  process.exit(0);
}

// node tools/deploy/proof.js
performer(process.argv);
