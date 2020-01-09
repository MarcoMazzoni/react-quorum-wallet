import { web3Providers } from './contractConfiguration';

export const nodeList: string[] = ['Node1', 'Node2', 'Node3', 'Node4', 'Node5'];

export const getWeb3ProviderFromNode = (name: string): any => {
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
      return;
  }
};

export const getAccountListFromNode = async (name: string): Promise<string[]> => {
  let web3Provider = getWeb3ProviderFromNode(name);
  let accountList: string[] = await web3Provider.eth.getAccounts();
  return accountList;
};
