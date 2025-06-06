import { PayersState } from './states/payers.state';
import { ReceiptState } from './states/receipt.state';

export const DEFAULT_PAYERS: PayersState = {
  payers: [],
};

export const DEFAULT_RECEIPT: ReceiptState = {
  currency: 'VND',
  items: [],
  product_count: 0,
  receipt_date: new Date(),
  total_receipt_price: 0,
};
