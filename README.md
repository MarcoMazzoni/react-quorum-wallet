# Overview
This is a simple PoC of a React-Redux WebApp interacting with a private Quorum network.

1. You can make common transactions as well as **private transactions** (you can also choose which nodes to include in the private transactions).
2. Once the transaction is confirmed, a success modal pops up and you can copy both the transaction hash and the block hash by clicking on them.
3. You can then paste those hashes in the BlockExplorer section of the app and lookup the transactions.
4. You can pick the node to log on by clicking on the Node header card.
5. You can see the balance of each account on the Balance header card.

![alt text](./quorum-react-img.jpg)


# Requirements

You need to have Truffle and Docker (also docker-compose) installed.
* **Truffle**: https://trufflesuite.com/docs/truffle/getting-started/installation.html
* **Docker**: https://docs.docker.com/engine/install/
* **Docker Compose**: https://docs.docker.com/compose/install/

# How to start the application

In the project directory, you can run:
```
run_app.sh
```
Once the script exited, you can simply connect to `http://localhost:5001` via browser.

This script will:
1. setup a private Quorum network of 5 nodes (with `IBFT` consensus) using `docker-compose`
2. deploy an *ERC20 token* smart contract on the blockchain using Truffle
3. copy the address of the smart contract into the `src/quorum-config.json` file 
4. deploy the web app containers using `docker-compose`


To shutdown the app, you just need to run the `shutdown_app.sh` script. This will remove all docker containers and volumes.

## Resources
* The docker image of the `quorum-react-app` can be found on my DockerHub at https://hub.docker.com/repository/docker/marcomazzoni/quorum-react-app
* All the deployment files of Quorum are under the `config` folder: you can lookup the complete deployment tool at https://github.com/MarcoMazzoni/quorum-docker-Nnodes
* The smart contract files are in the `truffle-erc20` directory
* The React code (written in TypeScript) can be found under `src`

```
.
├── config
├── src
└── truffle-erc20

```

## How it's made
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#####################################

### Generate contract type declaration file

npx typechain --target=web3-v1 --outDir ./src/contract './src/contract/\*.json'
npx typechain --target=web3-v1 --outDir ./src/contract './src/contract/MyToken.json'
