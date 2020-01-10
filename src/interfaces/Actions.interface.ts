import { QuorumNode } from './Node.interface';

export const CHANGE_NODE = 'CHANGE_NODE';
export const CHANGE_ACCOUNT_LIST = 'CHANGE_ACCOUNT_LIST';

export interface ChangeNodeAction {
  type: typeof CHANGE_NODE;
  node: QuorumNode;
}

export interface ChangeAccountListAction {
  type: typeof CHANGE_ACCOUNT_LIST;
  accounts: string[];
}

export type NodeActionTypes = ChangeNodeAction | ChangeAccountListAction;

export type AppActions = NodeActionTypes; //  | SomeOtherActionTypes1 | SomeOtherActionTypes2
