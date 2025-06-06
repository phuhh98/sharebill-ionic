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

  addItem(item: ReceiptState['items'][number]): void {
    if (!item) return;

    const currentItems = this.receiptSubject$.getValue().items;
    const updatedItems = [...currentItems, item];
    this.set({ items: updatedItems });
  }

  get(): BehaviorSubject<ReceiptState> {
    return this.receiptSubject$;
  }

  removeItem(itemId: string): void {
    if (!itemId) return;

    const currentItems = this.receiptSubject$.getValue().items;
    const updatedItems = currentItems.filter((item) => item.id !== itemId);
    this.set({ items: updatedItems });
  }

  set(stateChanges: Partial<ReceiptState>): void {
    if (!stateChanges) return;

    const receiptState: ReceiptState = { ...this.receiptSubject$.getValue(), ...stateChanges };
    this.receiptSubject$.next(receiptState);

    // sample explanation as in payers.service.ts
    this.storeService.set({ receipt: receiptState });
  }

  updateItem(itemId: string, itemChanges: Partial<ReceiptState['items'][number]>): void {
    if (!itemId || !itemChanges) return;

    const currentItems = this.receiptSubject$.getValue().items;
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, ...itemChanges } : item
    );
    this.set({ items: updatedItems });
  }
}
