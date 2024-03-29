export interface SendState {
  receipt: TransactionReceiptCustom;
}

interface ObjectDecoded {
  negative: number;
  words: number[];
}

export interface DecodedMethod {
  inputs: [string, ObjectDecoded];
  method: string;
  names: string[];
  types: string[];
}

export interface TransactionReceiptCustom {
  status: boolean;
  blockHash: string;
  blockNumber: number;
  transactionHash: string;
  from: string;
  to: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  logs?: LogEntry[];
}

export interface LogEntry {
  logIndex: number | null;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string | null;
  blockNumber: number | null;
  address: string;
  data: string;
  topics: string[];
}
