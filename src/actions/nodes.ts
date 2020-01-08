import { AppActions, CHANGE_NODE, ChangeNodeAction } from '../interfaces/Actions.interface';
import { QuorumNode } from '../interfaces/Node.interface';
import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';

export const changeNode = (node: QuorumNode): AppActions => {
  return {
    type: CHANGE_NODE,
    node
  };
};

export const startChangeNode = (node: QuorumNode) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(changeNode(node));
  };
};
