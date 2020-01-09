import { web3_node1, web3_node2, web3_node3 } from './Contract';

export const getWeb3ProviderFromNode = (name: string): any => {
  switch (name) {
    case 'Node1':
      return web3_node1;
    case 'Node2':
      return web3_node2;
    case 'Node3':
      return web3_node3;
    default:
      return;
  }
};
