import { PayersState } from './payers.state';
import { ReceiptState } from './receipt.state';

/**
 * The global custom state model.
 */
export interface StoreState {
  payers: PayersState;
  receipt: ReceiptState;
}

export type StoreStateKeys = keyof StoreState;
