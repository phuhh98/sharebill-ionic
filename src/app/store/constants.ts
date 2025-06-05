import { PayersState } from './states/payers.state';
import { ReceiptState } from './states/receipt.state';

export const DEFAULT_PAYERS: PayersState = {
  payers: [],
};

export const DEFAULT_RECEIPT: ReceiptState = {
  date: new Date(),
  items: [],
  totalAmount: 0,
};
