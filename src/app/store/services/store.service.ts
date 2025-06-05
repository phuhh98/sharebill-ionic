import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DEFAULT_PAYERS, DEFAULT_RECEIPT } from '../constants';
import { StoreInterface } from '../interfaces/store.interface';
import { PayersState } from '../states/payers.state';
import { ReceiptState } from '../states/receipt.state';
import { StoreState, StoreStateKeys } from '../states/store.state';
import { PayersService } from './payers.service';
import { ReceiptService } from './receipt.service';

/**
 * The StoreService (global) is a facade that holds and serves everything state related.
 * As specific states, it also contains exported subject(s) to be consumed elsewhere.
 */
@Injectable({ providedIn: 'root' })
export class StoreService implements StoreInterface<StoreState> {
  public get payersService(): PayersService {
    if (!this._payersService) this._payersService = this.injector.get(PayersService);
    return this._payersService;
  }

  public get receiptsService(): ReceiptService {
    if (!this._receiptsService) this._receiptsService = this.injector.get(ReceiptService);
    return this._receiptsService;
  }
  // Lazy injection of specific state services
  private _payersService: PayersService | undefined;

  private _receiptsService: ReceiptService | undefined;
  private stateSubject: BehaviorSubject<StoreState> = new BehaviorSubject<StoreState>({
    payers: DEFAULT_PAYERS,
    receipt: DEFAULT_RECEIPT,
  });

  constructor(private injector: Injector) {}

  // ----------------- Global state management -----------------

  /**
   * Returns the global state subject.
   */
  get(): BehaviorSubject<StoreState> {
    return this.stateSubject;
  }

  /**
   * Gets a global/specific state value by its key.
   * @param key Optional key, if not provided we return the global state object.
   */
  getStateByKey(key: '' | StoreStateKeys = '') {
    const globalState = this.stateSubject.getValue();
    return key ? globalState[key] : globalState;
  }

  /**
   * Applies some changes to the global state.
   * @param stateChanges The changes (an object) to populate.
   */
  set(stateChanges: Partial<StoreState>): void {
    if (!stateChanges) return;
    const currentStateValue = this.stateSubject.getValue();
    this.stateSubject.next({ ...currentStateValue, ...stateChanges });
  }

  // ----------------- Specific state facades calls -----------------
  /**
   * Sets payers state details.
   */
  setPayers(payersState: Partial<PayersState>): void {
    this.payersService.set(payersState);
  }

  setReceipt(receiptState: Partial<ReceiptState>): void {
    this.receiptsService.set(receiptState);
  }
}
