import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NamedHeaderComponent } from '@components/named-header/named-header.component';
import { ReceiptItemComponent } from '@components/receipt-item/receipt-item.component';
import { IonContent, IonList, IonListHeader } from '@ionic/angular/standalone';
import { StoreService } from '@store/services/store.service';
import { ReceiptState } from '@store/states/receipt.state';
import { addIcons } from 'ionicons';
import { create, trash } from 'ionicons/icons';
import { BehaviorSubject } from 'rxjs';
import { RECEIPT_RESPONSE_MOCK } from 'src/mocks/receipt';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    NamedHeaderComponent,
    IonContent,
    IonList,
    IonListHeader,
    ReceiptItemComponent,
  ],
  selector: 'app-receipt',
  standalone: true,
  styleUrls: ['./receipt.page.scss'],
  templateUrl: './receipt.page.html',
})
export class ReceiptPage implements OnInit {
  receipt: null | ReceiptState = null;

  private receipt$: BehaviorSubject<ReceiptState>;

  constructor(private storeService: StoreService) {
    this.receipt$ = this.storeService.receiptsService.get();

    addIcons({ create, trash });
  }

  deleteItem(itemId: string): void {
    if (!itemId) return;

    this.storeService.receiptsService.removeItem(itemId);
  }

  ngOnInit(): void {
    this.receipt$.subscribe((receipt) => {
      this.receipt = receipt;
    });

    const mockReceipt: ReceiptState = {
      ...RECEIPT_RESPONSE_MOCK.data.receipt,
      items: RECEIPT_RESPONSE_MOCK.data.receipt.items.map((item) => ({
        description: '',
        id: crypto.randomUUID(),
        name: item.name,
        quantity: item.quantity,
        total_price: item.price_total,
        unit_price: item.price,
      })),
      receipt_date: new Date(RECEIPT_RESPONSE_MOCK.data.receipt.receipt_date),
    };
    this.storeService.receiptsService.set(mockReceipt);
  }
}
