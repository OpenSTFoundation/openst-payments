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
 *       <li>Deploy Storage contract</li>
 *     </ol>
 *
 *
 * @module tools/deploy/storage
 *
 * node tools/deploy/storage.js 0x12A05F200 $OST_UTILITY_CHAIN_ID travis s1.txt
 */

const readline = require('readline')
  , rootPrefix = '../..'
  , web3Provider = require(rootPrefix + '/lib/web3/providers/ws')
  , prompts = readline.createInterface(process.stdin, process.stdout)
  , logger = require(rootPrefix + '/helpers/custom_console_logger')
  , Deployer = require(rootPrefix + '/services/deploy/deployer')
  , coreAddresses = require(rootPrefix + '/config/core_addresses')
  , returnTypes = require(rootPrefix + "/lib/global_constant/return_types")
  , helper = require(rootPrefix + "/tools/deploy/helper")
  , openstPayment = require(rootPrefix + '/index')
  , gasLimitGlobalConstant = require(rootPrefix + '/lib/global_constant/gas_limit')
;

// Different addresses used for deployment
const deployerName = "deployer"
  , deployerAddress = coreAddresses.getAddressForUser(deployerName)
  , deployerPassphrase = coreAddresses.getPassphraseForUser(deployerName)
;


/**
 * Validation Method
 *
 * @param {Array} arguments
 *
 * @return {}
 */
function validate(argv) {

}

/**
 * It is the main performer method of this deployment script
 *
 * @param {Array} arguments
 *
 * @return {}
 */
async function performer(argv) {

  logger.debug("argv[0]: " + argv[0]);
  logger.debug("argv[1]: " + argv[1]);
  logger.debug("argv[2]: " + argv[2]);
  logger.debug("argv[3]: " + argv[3]);
  logger.debug("argv[4]: " + argv[4]);
  logger.debug("argv[5]: " + argv[5]);

  validate(argv);

  var gasPrice =  argv[2]
    , chainId = argv[3]
    , isTravisCIEnabled = false
  ;
  if (argv[4] !== undefined) {
    isTravisCIEnabled = argv[4].trim() === 'travis';
  }
  const fileForContractAddress = (argv[5] !== undefined) ? argv[5].trim() : '';

  logger.debug("Travis CI enabled Status: " + isTravisCIEnabled);
  logger.debug("File to write For ContractAddress: "+fileForContractAddress);
  if (isTravisCIEnabled === false ) {
    await new Promise(
      function (onResolve, onReject) {
        prompts.question("Please verify all above details. Do you want to proceed? [Y/N]", function (intent) {
          if (intent === 'Y') {
            logger.debug('Great! Proceeding deployment.');
            prompts.close();
            onResolve();
          } else {
            logger.error('Exiting deployment scripts. Change the enviroment variables and re-run.');
            process.exit(1);
          }
        });
      }
    );
  } else {
    prompts.close();
  }

  const constructorArgs = [];

  const contractName = 'storage'
    , deployOptions = {returnType: returnTypes.transactionReceipt()};
  ;

  const deployerInstance = new Deployer({
    contract_name: contractName,
    constructor_args: constructorArgs,
    gas_price: gasPrice,
    gas_limit: gasLimitGlobalConstant.default(),
    options: deployOptions
  });
  const deployResult =  await deployerInstance.perform();

  if (deployResult.isSuccess()) {
    logger.win("deploy Receipt: ", deployResult.data.transaction_receipt);
    const contractAddress = deployResult.data.transaction_receipt.contractAddress;
    logger.win("contractAddress: " + contractAddress);
    if (fileForContractAddress !== '') {
      helper.writeContractAddressToFile(fileForContractAddress, contractAddress);
    }

  } else {
    logger.error("Error deploying contract");
    logger.error(deployResult);
  }

  process.exit(0);
}

performer(process.argv);
