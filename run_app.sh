#!/bin/bash -i

set -e
current_dir=`pwd`

set -v

## Starting up the 5-nodes Quorum network
cd 'config' && ./setup.sh && cd $current_dir

## Waiting for the blockchain nodes to start up  all the services 
sleep 60

cd 'truffle-erc20'
truffle migrate --reset
contract_address=`truffle networks | grep 'MyToken:' | awk '{print $2}'`
cd $current_dir

sed -i '/contractAddress/c \ \ "contractAddress": "'"$contract_address"'",' $current_dir/src/quorum-config.json

docker-compose up -d 

#### You can now open the webapp on your browser ---> http://localhost:5001  