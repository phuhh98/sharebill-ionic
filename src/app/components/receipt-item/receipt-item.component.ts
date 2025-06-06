import { CurrencyPipe } from '@angular/common';
import { Component, input, ViewChild } from '@angular/core';
import { ItemEditModalComponent } from '@components/item-edit-modal/item-edit-modal.component';
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonNote,
} from '@ionic/angular/standalone';
import { StoreService } from '@store/services/store.service';
import { ReceiptItem } from '@store/states/receipt.state';
import { EllipsisPipe } from 'src/app/pipes/ellipsis.pipe';

@Component({
  imports: [
    IonNote,
    IonItem,
    IonItemOptions,
    IonItemSliding,
    IonItemOption,
    IonLabel,
    EllipsisPipe,
    IonNote,
    IonIcon,
    CurrencyPipe,
    ItemEditModalComponent,
  ],
  selector: 'app-receipt-item',
  standalone: true,
  styleUrls: ['./receipt-item.component.scss'],
  templateUrl: './receipt-item.component.html',
})
export class ReceiptItemComponent {
  aboutToDelete = false;
  currencyCode = input<string>('');
  itemData = input<ReceiptItem>();
  @ViewChild(IonItemSliding) itemSliding!: IonItemSliding;
  private deleteDelay = 300;
  private deleteTimeoutId: any = null;

  constructor(private storeService: StoreService) {}

  deleteItem(itemId: string): void {
    if (!itemId) return;

    this.storeService.receiptsService.removeItem(itemId);
  }

  onItemDrag(id: string) {
    this.itemSliding.getSlidingRatio().then((ratio) => {
      if (ratio >= 2) {
        this.aboutToDelete = true;

        this.deleteTimeoutId = setTimeout(() => {
          this.deleteItem(id);
        }, this.deleteDelay);
      } else {
        this.aboutToDelete = false;
        clearTimeout(this.deleteTimeoutId!);
      }
    });
  }
}
