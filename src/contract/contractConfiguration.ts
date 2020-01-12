import Web3 from 'web3';
import { MyToken } from './MyToken';
import { myTokenAbi } from './myToken-abi';

export const web3_node1 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23001')
);
const quorumjs_node1 = require('quorum-js');
quorumjs_node1.extend(web3_node1);

export const web3_node2 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23002')
);
const quorumjs_node2 = require('quorum-js');
quorumjs_node2.extend(web3_node2);

export const web3_node3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23003')
);
const quorumjs_node3 = require('quorum-js');
quorumjs_node3.extend(web3_node3);

export const web3_node4 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23004')
);

export const web3_node5 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23005')
);

export const web3Providers = [
  web3_node1,
  web3_node2,
  web3_node3,
  web3_node4,
  web3_node5
];

// Deployment address of the Smart Contract
const address: string = '0x980b7d17Af1c4F5BbB626E2332AbF65120e58f1E';

export const contractOfNode: MyToken[] = [
  new web3_node1.eth.Contract(myTokenAbi, address),
  new web3_node2.eth.Contract(myTokenAbi, address),
  new web3_node3.eth.Contract(myTokenAbi, address),
  new web3_node4.eth.Contract(myTokenAbi, address),
  new web3_node5.eth.Contract(myTokenAbi, address)
];
