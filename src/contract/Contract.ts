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
quorumjs_node1.extend(web3_node2);

export const web3_node3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23003')
);
const quorumjs_node3 = require('quorum-js');
quorumjs_node1.extend(web3_node3);

const address: string = '0x5F1ce7b26d69387A230524eA2A37afEe059c1270';

export const myContract: MyToken = new web3_node1.eth.Contract(myTokenAbi, address);
