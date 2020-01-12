import { QuorumNode } from './Node.interface';

export const CHANGE_NODE = 'CHANGE_NODE';
export const CHANGE_ACCOUNT_SELECTED = 'CHANGE_ACCOUNT_SELECTED';

export interface ChangeNodeAction {
  type: typeof CHANGE_NODE;
  node: QuorumNode;
}

export interface ChangeAccountSelectedAction {
  type: typeof CHANGE_ACCOUNT_SELECTED;
  account: string;
}

export type NodeActionTypes = ChangeNodeAction | ChangeAccountSelectedAction;

export type AppActions = NodeActionTypes; //  | SomeOtherActionTypes1 | SomeOtherActionTypes2
