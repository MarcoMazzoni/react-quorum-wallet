import {
  AppActions,
  CHANGE_NODE,
  CHANGE_ACCOUNT_SELECTED
} from '../interfaces/Actions.interface';
import { QuorumNode } from '../interfaces/Node.interface';
import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';
import { getAccountListFromNode } from '../contract/utils';

export const changeNode = (node: QuorumNode): AppActions => {
  return {
    type: CHANGE_NODE,
    node
  };
};

const changeAccountSelected = (account: string): AppActions => {
  return {
    type: CHANGE_ACCOUNT_SELECTED,
    account
  };
};

export const startChangeNode = (nodeName: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    return getAccountListFromNode(nodeName).then(accountList => {
      dispatch(
        changeNode({
          name: nodeName,
          accounts: accountList,
          accountSelected: accountList[0]
        })
      );
    });
  };
};

export const startChangeAccount = (account: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(changeAccountSelected(account));
  };
};
