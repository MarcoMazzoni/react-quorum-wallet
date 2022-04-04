import { QuorumNode } from '../interfaces/Node.interface';
import configJson from '../quorum-config.json';
import {
  NodeActionTypes,
  CHANGE_NODE,
  CHANGE_ACCOUNT_SELECTED
} from '../interfaces/Actions.interface';

const nodeReducerDefaultState: QuorumNode = {
  name: 'Node1',
  accounts: [configJson.nodes[0].account],
  accountSelected: configJson.nodes[0].account
};

const nodeReducer = (
  state = nodeReducerDefaultState,
  action: NodeActionTypes
): QuorumNode => {
  switch (action.type) {
    case CHANGE_NODE:
      return action.node;
    case CHANGE_ACCOUNT_SELECTED:
      return {
        name: state.name,
        accounts: state.accounts,
        accountSelected: action.account
      };
    default:
      return state;
  }
};

export { nodeReducer };
