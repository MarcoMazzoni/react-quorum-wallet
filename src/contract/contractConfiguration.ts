import Web3 from 'web3';
import { MyToken } from './MyToken';
import { myTokenAbi } from './myToken-abi';
const quorumjs = require('quorum-js');

// Deployment address of the Smart Contract
export const contractAddress: string =
  '0x60D1269257887645A8874439aABb5C9a5Fb742dA';

export interface TxManager {
  privateUrl: string;
  publicKey: string;
}

export const TX_MANAGER: TxManager[] = [
  {
    privateUrl: 'http://localhost:27001',
    publicKey: 'aN7yySSxQGQsx+r8NJdI8YXtwH6gSIZt585aWVKrV3I='
  },
  {
    privateUrl: 'http://localhost:27002',
    publicKey: '6E54TChUffI3mRoTOHQPfpMktumCU29642vptg7pNGc='
  },
  {
    privateUrl: 'http://localhost:27003',
    publicKey: 'bvzCXdCjjtrNo8x7J6kwGCdmYiKT2EB/uBqI4uCQ6SE='
  },
  {
    privateUrl: 'http://localhost:27004',
    publicKey: 'LQCEGDs4PBzVWjC5HeBKEc2ir7Sk6K/zIbZ+ytENdmU='
  },
  {
    privateUrl: 'http://localhost:27005',
    publicKey: 'evYLE3JiTzd9EHr4Cu46dI80bkNXHSsBIi6qK7zo3yw='
  }
];

/** NODE_1 CONFIGURATION */
export const web3_node1: Web3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23001')
);
export const txManager_node1 = quorumjs.RawTransactionManager(web3_node1, {
  privateUrl: TX_MANAGER[0].privateUrl
});

/** NODE_2 CONFIGURATION */

export const web3_node2: Web3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23002')
);
export const txManager_node2 = quorumjs.RawTransactionManager(web3_node2, {
  privateUrl: TX_MANAGER[1].privateUrl
});

export const web3_node3: Web3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23003')
);
export const txManager_node3 = quorumjs.RawTransactionManager(web3_node3, {
  privateUrl: TX_MANAGER[2].privateUrl
});

export const web3_node4: Web3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23004')
);
export const txManager_node4 = quorumjs.RawTransactionManager(web3_node4, {
  privateUrl: TX_MANAGER[3].privateUrl
});

export const web3_node5: Web3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23005')
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
