export const SET_NUMBER = 'SET_NUMBER';
export const GET_NUMBER = 'GET_NUMBER';

export interface SetNumberMethod {
  type: typeof SET_NUMBER;
  payload: number;
}

export interface GetNumberMethod {
  type: typeof GET_NUMBER;
}

export type MethodTypes = SetNumberMethod | GetNumberMethod;

export type AppActions = MethodTypes;
