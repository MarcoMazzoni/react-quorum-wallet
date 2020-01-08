import { QuorumNode } from '../interfaces/Node.interface';
import { NodeActionTypes, CHANGE_NODE } from '../interfaces/Actions.interface';

const nodeReducerDefaultState: QuorumNode = { name: 'Node1' };

const nodeReducer = (
  state = nodeReducerDefaultState,
  action: NodeActionTypes
): QuorumNode => {
  switch (action.type) {
    case CHANGE_NODE:
      return action.node;
    default:
      return state;
  }
};

export { nodeReducer };
