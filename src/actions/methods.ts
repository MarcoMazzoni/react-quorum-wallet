import { AppActions } from '../interfaces/Methods.interface';

export const getNumber = (): AppActions => {
  return {
    type: 'GET_NUMBER'
  };
};

export const setNumber = (num: number): AppActions => {
  return {
    type: 'SET_NUMBER',
    payload: num
  };
};
