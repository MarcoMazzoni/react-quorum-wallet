import Web3 from 'web3';
import { MyToken } from './MyToken';
import { myTokenAbi } from './myToken-abi';

export const web3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:23001')
);

const quorumjs = require('quorum-js');
quorumjs.extend(web3);

const address: string = '0x5F1ce7b26d69387A230524eA2A37afEe059c1270';

export const myContract: MyToken = new web3.eth.Contract(myTokenAbi, address);
