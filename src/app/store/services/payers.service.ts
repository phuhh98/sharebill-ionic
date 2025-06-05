import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DEFAULT_PAYERS } from '../constants';
import { StoreInterface } from '../interfaces/store.interface';
import { PayersState } from '../states/payers.state';
import { StoreService } from './store.service';

@Injectable({ providedIn: 'root' })
export class PayersService implements StoreInterface<PayersState> {
  private payersSubject$: BehaviorSubject<PayersState> = new BehaviorSubject<PayersState>(
    DEFAULT_PAYERS
  );

  constructor(private storeService: StoreService) {}

  addPayer(payerName: string): void {
    if (!payerName || payerName.trim() === '') {
      return;
    }

    const currentPayers = this.payersSubject$.getValue().payers;
    const newPayer = { name: payerName.trim() };

    // Check if the payer already exists
    if (currentPayers.some((payer) => payer.name === newPayer.name)) {
      return; // Payer already exists, do not add
    }

    // Add the new payer to the state
    this.set({ payers: [...currentPayers, newPayer] });
  }

  get(): BehaviorSubject<PayersState> {
    return this.payersSubject$;
  }

  removePayer(payerName: string): void {
    if (!payerName || payerName.trim() === '') {
      return;
    }
    const currentPayers = this.payersSubject$.getValue().payers;
    console.log('Removing payer:', payerName);

    console.log('Current payers before removal:', currentPayers);
    const updatedPayers = currentPayers.filter((payer) => payer.name !== payerName.trim());
    this.set({ payers: updatedPayers });
  }

  set(stateChanges: Partial<PayersState>): void {
    if (!stateChanges) return;

    const payersState: PayersState = { ...this.payersSubject$.getValue(), ...stateChanges };
    this.payersSubject$.next(payersState);

    // payersSubject and storeSubject inside storeService is two disctinct subjects.
    // so one update in payersSubject will not update storeService's state.
    // in order to achive update in storeService's state, we need to call set method.
    // we could use payersState directly, but we want to keep the same structure as in storeService.
    this.storeService.set({ payers: payersState });
  }
}
