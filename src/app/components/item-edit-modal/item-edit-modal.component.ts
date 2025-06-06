import { Component, input, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { StoreService } from '@store/services/store.service';
import { ReceiptItem } from '@store/states/receipt.state';

@Component({
  imports: [
    IonButton,
    FormsModule,
    IonInput,
    IonItem,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonContent,
    ReactiveFormsModule,
  ],
  selector: 'app-item-edit-modal',
  standalone: true,
  styleUrls: ['./item-edit-modal.component.scss'],
  templateUrl: './item-edit-modal.component.html',
})
export class ItemEditModalComponent implements OnInit {
  currencyCode = input<string>('');
  itemData = input<ReceiptItem>();
  itemForm = new FormGroup({
    description: new FormControl<string>('', {
      nonNullable: false,
      validators: [],
    }),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [],
    }),
    quantity: new FormControl<number>(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    unitPrice: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });
  @ViewChild(IonModal) modal!: IonModal;

  name = 'something';

  triggerId = input<string>('');

  constructor(private storeService: StoreService) {}

  cancel() {
    this.modal.dismiss();
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  ngOnInit() {
    this.itemForm.patchValue({
      description: this.itemData()?.description || '',
      name: this.itemData()?.name || '',
      quantity: this.itemData()?.quantity || 1,
      unitPrice: this.itemData()?.unit_price || 0,
    });
  }

  onItemFormSubmit() {}
}
