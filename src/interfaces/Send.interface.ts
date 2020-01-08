export interface SendState {
  receipt: TransactionReceiptCustom;
}

export interface TransactionReceiptCustom {
  status: boolean;
  blockHash: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
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
