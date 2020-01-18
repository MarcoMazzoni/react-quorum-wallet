import Web3 from 'web3';
import {
  web3Providers,
  contractOfNode,
  TX_MANAGER,
  TxManager,
  txManagerProviders
} from './contractConfiguration';
import { MyToken } from './MyToken';
import util from 'util';

const rp = require('request-promise-native');

export const nodeList: string[] = ['Node1', 'Node2', 'Node3', 'Node4', 'Node5'];

export const getWeb3ProviderFromNode = (name: string): Web3 => {
  switch (name) {
    case 'Node1':
      return web3Providers[0];
    case 'Node2':
      return web3Providers[1];
    case 'Node3':
      return web3Providers[2];
    case 'Node4':
      return web3Providers[3];
    case 'Node5':
      return web3Providers[4];
    default:
      return new Web3();
  }
};

export const getContractByNode = (name: string): MyToken => {
  switch (name) {
    case 'Node1':
      return contractOfNode[0];
    case 'Node2':
      return contractOfNode[1];
    case 'Node3':
      return contractOfNode[2];
    case 'Node4':
      return contractOfNode[3];
    case 'Node5':
      return contractOfNode[4];
    default:
      return contractOfNode[0];
  }
};

export const getTxManagerByNode = (name: string): TxManager => {
  switch (name) {
    case 'Node1':
      return TX_MANAGER[0];
    case 'Node2':
      return TX_MANAGER[1];
    case 'Node3':
      return TX_MANAGER[2];
    case 'Node4':
      return TX_MANAGER[3];
    case 'Node5':
      return TX_MANAGER[4];
    default:
      return { privateUrl: '', publicKey: '' };
  }
};

export const getTxManagerProviderByNode = (name: string): any => {
  switch (name) {
    case 'Node1':
      return txManagerProviders[0];
    case 'Node2':
      return txManagerProviders[1];
    case 'Node3':
      return txManagerProviders[2];
    case 'Node4':
      return txManagerProviders[3];
    case 'Node5':
      return txManagerProviders[4];
    default:
      return;
  }
};

export const getAllTesseraPublicKeys = (): string[] => {
  let keys: string[] = [];
  for (let i = 0, length = TX_MANAGER.length; i < length; ++i) {
    keys.push(TX_MANAGER[i].publicKey);
  }
  return keys;
};

export const getAccountListFromNode = async (
  name: string
): Promise<string[]> => {
  let web3Provider = getWeb3ProviderFromNode(name);
  let accountList: string[] = await web3Provider.eth.getAccounts();
  return accountList;
};

export const getAllAccountsFromAllNodes = async (): Promise<string[]> => {
  let allAccounts: string[] = [];
  for (let i = 0, length = nodeList.length; i < length; ++i) {
    let accountList: string[] = await getAccountListFromNode(nodeList[i]);
    for (let j = 0, len = accountList.length; j < len; ++j) {
      let node_account: string = '(' + nodeList[i] + ') ' + accountList[j];
      accountList[j] = node_account;
    }
    allAccounts = [...allAccounts, ...accountList];
  }
  return allAccounts;
};

const getHostsFromWeb3Provider = (nodeName: string): string => {
  switch (nodeName) {
    case 'Node1':
      return 'http://localhost:23001';
    case 'Node2':
      return 'http://localhost:23002';
    case 'Node3':
      return 'http://localhost:23003';
    case 'Node4':
      return 'http://localhost:23004';
    case 'Node5':
      return 'http://localhost:23005';
    default:
      return '';
  }
};

interface ResultObjectAPI {
  id: number;
  jsonrpc: string;
  result: string;
}

export const getQuorumPayloadRequest = async (
  payload: string,
  nodeName: string
) => {
  let host: string = getHostsFromWeb3Provider(nodeName);
  const quorumPayloadRequest = {
    method: 'POST',
    // eslint-disable-next-line no-underscore-dangle
    uri: host,
    json: true,
    body: {
      jsonrpc: '2.0',
      method: 'eth_getQuorumPayload',
      params: [payload],
      id: '1'
    }
  };

  return rp(quorumPayloadRequest).then((res: ResultObjectAPI) => {
    return res.result;
  });
};

// non farlo mai
/*
export const populateNodesWithAccounts = async () => {
  for (let i = 0, length = nodeList.length; i < length; ++i) {
    for (let j = 0; j < 2; ++j)
      await web3Providers[i].eth.personal.newAccount('');
  }
};
*/
