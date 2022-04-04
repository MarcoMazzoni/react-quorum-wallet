#!/bin/bash

#web3j truffle generate /home/marco/truffle-erc20/build/contracts/MyToken.json -o /home/marco/my-token-sdk/src/main/java -p com.conio.mytoken

#web3j truffle generate /home/marco/truffle-erc20/build/contracts/MyToken.json -o /home/marco/android-ERC20-Wallet/app/src/main/java -p ru.fastsrv.mytoken

solc /home/marco/truffle-erc20/contracts/MyToken.sol --allow-paths /home/marco/truffle-erc20/node_modules --bin --abi --optimize -o /home/marco/scudo-3/src/contract/