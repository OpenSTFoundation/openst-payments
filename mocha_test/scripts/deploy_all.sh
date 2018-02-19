
#!/bin/bash
cd ..
sh ../contracts/compile.sh
. ./scripts/env_vars.sh

echo "\n********* Deploying test coin 1 *************"
node ../tools/deploy/EIP20TokenMock.js 5 TC1 TestCoin1 18 0x12A05F200 travis tc1.txt
export TEST_COIN1_C5_ADDRESS=$(cat ../tools/deploy/tc1.txt)
echo '\nexport TEST_COIN1_C5_ADDRESS='\'$TEST_COIN1_C5_ADDRESS\'>>scripts/env_vars.sh
rm ../tools/deploy/tc1.txt
echo "\n********* Done *************"

echo "\n********* Deploying test coin 2 *************"
. ./scripts/env_vars.sh
node ../tools/deploy/EIP20TokenMock.js 2 TC2 TestCoin2 18 0x12A05F200 travis tc2.txt
export TEST_COIN2_C2_ADDRESS=$(cat ../tools/deploy/tc2.txt)
echo '\nexport TEST_COIN2_C2_ADDRESS='\'$TEST_COIN2_C2_ADDRESS\'>>scripts/env_vars.sh
rm ../tools/deploy/tc2.txt
echo "\n********* Done *************"

echo "\n********* Deploying test coin 3 *************"
. ./scripts/env_vars.sh
node ../tools/deploy/EIP20TokenMock.js 3 TC3 TestCoin3 10 0x12A05F200 travis tc3.txt
export TEST_COIN3_C3_ADDRESS=$(cat ../tools/deploy/tc3.txt)
echo '\nexport TEST_COIN3_C3_ADDRESS='\'$TEST_COIN3_C3_ADDRESS\'>>scripts/env_vars.sh
rm ../tools/deploy/tc3.txt
echo "\n********* Done *************"


echo "\n********* Deploying Pricer 1 *************"
. ./scripts/env_vars.sh
node ../tools/deploy/pricer.js $TEST_COIN1_C5_ADDRESS OST 0x12A05F200 travis tp1.txt
export TEST_PRICER_C5_ADDRESS=$(cat ../tools/deploy/tp1.txt)
echo '\nexport TEST_PRICER_C5_ADDRESS='\'$TEST_PRICER_C5_ADDRESS\'>>scripts/env_vars.sh
rm ../tools/deploy/tp1.txt
echo "\n********* Done *************"

echo "\n********* Deploying Pricer 2 *************"
. ./scripts/env_vars.sh
node ../tools/deploy/pricer.js $TEST_COIN2_C2_ADDRESS OST 0x12A05F200 travis tp2.txt
export TEST_PRICER_C2_ADDRESS=$(cat ../tools/deploy/tp2.txt)
echo '\nexport TEST_PRICER_C2_ADDRESS='\'$TEST_PRICER_C2_ADDRESS\'>>scripts/env_vars.sh
rm ../tools/deploy/tp2.txt
echo "\n********* Done *************"

echo "\n********* Deploying Pricer 3 *************"
. ./scripts/env_vars.sh
node ../tools/deploy/pricer.js $TEST_COIN3_C3_ADDRESS OST 0x12A05F200 travis tp3.txt
export TEST_PRICER_C3_ADDRESS=$(cat ../tools/deploy/tp3.txt)
echo '\nexport TEST_PRICER_C3_ADDRESS='\'$TEST_PRICER_C3_ADDRESS\'>>scripts/env_vars.sh
rm ../tools/deploy/tp3.txt
echo "\n********* Done *************"

echo "\n********* Deploying Worker Contract Address *************"
node ../tools/deploy/workers.js 0x12A05F200 travis w1.txt
export TEST_WORKER_CONTRACT_ADDRESS=$(cat ../tools/deploy/w1.txt)
echo '\nexport TEST_WORKER_CONTRACT_ADDRESS='\'$TEST_WORKER_CONTRACT_ADDRESS\'>>scripts/env_vars.sh
rm ../tools/deploy/w1.txt
echo "\n********* Done *************"

echo "\n Sourcing env_vars again"
. ./scripts/env_vars.sh

echo "\n********* Deploying Airdrop Contract Address *************"
. ./scripts/env_vars.sh
node ../tools/deploy/airdrop.js $TEST_COIN1_C5_ADDRESS OST $TEST_WORKER_CONTRACT_ADDRESS $OST_AIRDROP_BUDGET_HOLDER 0x12A05F200 travis ad1.txt
export TEST_AIRDROP1_CONTRACT_ADDRESS=$(cat ../tools/deploy/ad1.txt)
echo '\nexport TEST_AIRDROP1_CONTRACT_ADDRESS='\'$TEST_AIRDROP1_CONTRACT_ADDRESS\'>>scripts/env_vars.sh
rm ../tools/deploy/ad1.txt
echo "\n********* Done *************"


echo "\n********* Setting env variables *************"
. ./scripts/env_vars.sh
cd scripts

export OST_PO_GETH_RPC_PROVIDER=$OST_PRICER_GETH_RPC_PROVIDER
export OST_PO_DEPLOYER_ADDR=$OST_PRICER_DEPLOYER_ADDR
export OST_PO_DEPLOYER_PASSPHRASE=$OST_PRICER_DEPLOYER_PASSPHRASE
export OST_PO_OPS_ADDR=$OST_PRICER_OPS_ADDR
export OST_PO_OPS_PASSPHRASE=$OST_PRICER_OPS_PASSPHRASE
export OST_PO_PRICE_ORACLES='{}'
export OST_PO_CHAIN_ID=$OST_PRICER_CHAIN_ID
export OST_CACHING_ENGINE='none'

echo '\nexport OST_PO_GETH_RPC_PROVIDER='\'$OST_PO_GETH_RPC_PROVIDER\'>>env_vars.sh
echo '\nexport OST_PO_DEPLOYER_ADDR='\'$OST_PO_DEPLOYER_ADDR\'>>env_vars.sh
echo '\nexport OST_PO_DEPLOYER_PASSPHRASE='\'$OST_PO_DEPLOYER_PASSPHRASE\'>>env_vars.sh
echo '\nexport OST_PO_OPS_ADDR='\'$OST_PO_OPS_ADDR\'>>env_vars.sh
echo '\nexport OST_PO_OPS_PASSPHRASE='\'$OST_PO_OPS_PASSPHRASE\'>>env_vars.sh
echo '\nexport OST_PO_PRICE_ORACLES='\'$OST_PO_PRICE_ORACLES\'>>env_vars.sh
echo '\nexport OST_PO_CHAIN_ID='\'$OST_PO_CHAIN_ID\'>>env_vars.sh
echo '\nexport OST_CACHING_ENGINE='\'$OST_CACHING_ENGINE\'>>env_vars.sh


echo "\n********* Done *************"

sh deploy_price_oracle.sh

