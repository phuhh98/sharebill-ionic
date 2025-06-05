import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DEFAULT_RECEIPT } from '../constants';
import { StoreInterface } from '../interfaces/store.interface';
import { ReceiptState } from '../states/receipt.state';
import { StoreService } from './store.service';

@Injectable({ providedIn: 'root' })
export class ReceiptService implements StoreInterface<ReceiptState> {
  private receiptSubject$: BehaviorSubject<ReceiptState> = new BehaviorSubject<ReceiptState>(
    DEFAULT_RECEIPT
  );

  constructor(private storeService: StoreService) {}

  get(): BehaviorSubject<ReceiptState> {
    return this.receiptSubject$;
  }

  set(stateChanges: Partial<ReceiptState>): void {
    if (!stateChanges) return;

    const receiptState: ReceiptState = { ...this.receiptSubject$.getValue(), ...stateChanges };
    this.receiptSubject$.next(receiptState);

    // sample explanation as in payers.service.ts
    this.storeService.set({ receipt: receiptState });
  }
}
