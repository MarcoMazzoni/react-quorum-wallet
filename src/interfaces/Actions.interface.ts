import { QuorumNode } from './Node.interface';

export const CHANGE_NODE = 'CHANGE_NODE';
export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';

export interface ChangeNodeAction {
  type: typeof CHANGE_NODE;
  node: QuorumNode;
}

export interface ChangeAccountAction {
  type: typeof CHANGE_ACCOUNT;
  account: string;
}

export type NodeActionTypes = ChangeNodeAction | ChangeAccountAction;

export type AppActions = NodeActionTypes; //  | SomeOtherActionTypes1 | SomeOtherActionTypes2
