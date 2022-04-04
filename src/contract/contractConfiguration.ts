import Web3 from 'web3';
import { MyToken } from './MyToken';
import { myTokenAbi } from './myToken-abi';
import configJson from '../quorum-config.json'; 
const quorumjs = require('quorum-js');

// Deployment address of the Smart Contract
export const contractAddress: string = "0xfEa90c68ba63B4c0fAd8270b545E480a3E82A557";

export const hosts: string[] = [
  '172.13.0.2',
  '172.13.0.3',
  '172.13.0.4',
  '172.13.0.5',
  '172.13.0.6'
];

export interface TxManager {
  privateUrl: string;
  publicKey: string;
}

export const TX_MANAGER: TxManager[] = [
  {
    //privateUrl: 'http://localhost:27001',
    //privateUrl: 'http://172.13.0.2:9081',
    privateUrl: configJson.nodes[0].privateUrl,
    publicKey: configJson.nodes[0].tesseraKey
  },
  {
    //privateUrl: 'http://localhost:27002',
    privateUrl: configJson.nodes[1].privateUrl,
    publicKey: configJson.nodes[1].tesseraKey
  },
  {
    //privateUrl: 'http://localhost:27003',
    privateUrl: configJson.nodes[2].privateUrl,
    publicKey: configJson.nodes[2].tesseraKey
  },
  {
    //privateUrl: 'http://localhost:27004',
    privateUrl: configJson.nodes[3].privateUrl,
    publicKey: configJson.nodes[3].tesseraKey
  },
  {
    //privateUrl: 'http://localhost:27005',
    privateUrl: configJson.nodes[4].privateUrl,
    publicKey: configJson.nodes[4].tesseraKey
  }
];

/** NODE_1 CONFIGURATION */
export const web3_node1: Web3 = new Web3(
  //new Web3.providers.HttpProvider('http://localhost:23001')
  new Web3.providers.HttpProvider('http://172.13.0.2:8545')
  //new Web3.providers.HttpProvider(configJson.nodes[0].url)
);
export const txManager_node1 = quorumjs.RawTransactionManager(web3_node1, {
  privateUrl: TX_MANAGER[0].privateUrl
});

/** NODE_2 CONFIGURATION */

export const web3_node2: Web3 = new Web3(
  //new Web3.providers.HttpProvider('http://localhost:23002')
  new Web3.providers.HttpProvider('http://172.13.0.3:8545')
  //new Web3.providers.HttpProvider(configJson.nodes[1].url)
);
export const txManager_node2 = quorumjs.RawTransactionManager(web3_node2, {
  privateUrl: TX_MANAGER[1].privateUrl
});

export const web3_node3: Web3 = new Web3(
  //new Web3.providers.HttpProvider('http://localhost:23003')
  new Web3.providers.HttpProvider('http://172.13.0.4:8545')
  //new Web3.providers.HttpProvider(configJson.nodes[2].url)
);
export const txManager_node3 = quorumjs.RawTransactionManager(web3_node3, {
  privateUrl: TX_MANAGER[2].privateUrl
});

export const web3_node4: Web3 = new Web3(
  //new Web3.providers.HttpProvider('http://localhost:23004')
  new Web3.providers.HttpProvider('http://172.13.0.5:8545')
  //new Web3.providers.HttpProvider(configJson.nodes[3].url)
);
export const txManager_node4 = quorumjs.RawTransactionManager(web3_node4, {
  privateUrl: TX_MANAGER[3].privateUrl
});

export const web3_node5: Web3 = new Web3(
  //new Web3.providers.HttpProvider('http://localhost:23005')
  new Web3.providers.HttpProvider('http://172.13.0.6:8545')
  //new Web3.providers.HttpProvider(configJson.nodes[4].url)
);
export const txManager_node5 = quorumjs.RawTransactionManager(web3_node5, {
  privateUrl: TX_MANAGER[4].privateUrl
});

export const web3Providers = [
  web3_node1,
  web3_node2,
  web3_node3,
  web3_node4,
  web3_node5
];

export const txManagerProviders = [
  txManager_node1,
  txManager_node2,
  txManager_node3,
  txManager_node4,
  txManager_node5
];

export const contractOfNode: MyToken[] = [
  new web3_node1.eth.Contract(myTokenAbi, contractAddress),
  new web3_node2.eth.Contract(myTokenAbi, contractAddress),
  new web3_node3.eth.Contract(myTokenAbi, contractAddress),
  new web3_node4.eth.Contract(myTokenAbi, contractAddress),
  new web3_node5.eth.Contract(myTokenAbi, contractAddress)
];
