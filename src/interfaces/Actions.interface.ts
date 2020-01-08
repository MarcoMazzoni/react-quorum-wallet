import { QuorumNode } from './Node.interface';

export const CHANGE_NODE = 'CHANGE_NODE';

export interface ChangeNodeAction {
  type: typeof CHANGE_NODE;
  node: QuorumNode;
}

export type NodeActionTypes = ChangeNodeAction;

export type AppActions = NodeActionTypes; //  | SomeOtherActionTypes1 | SomeOtherActionTypes2
