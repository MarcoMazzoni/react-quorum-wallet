import { QuorumNode } from '../interfaces/Node.interface';
import {
  NodeActionTypes,
  CHANGE_NODE,
  CHANGE_ACCOUNT_SELECTED
} from '../interfaces/Actions.interface';

const nodeReducerDefaultState: QuorumNode = {
  name: 'Node1',
  accounts: ['0x0'],
  accountSelected: '0x0'
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
