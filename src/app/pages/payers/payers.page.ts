import { CommonModule, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DismissibleToastComponent } from '@components/dismissible-toast/dismissible-toast.component';
import { NamedHeaderComponent } from '@components/named-header/named-header.component';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/angular/standalone';
import { IonAvatar } from '@ionic/angular/standalone';
import { StoreService } from '@store/services/store.service';
import { PayersState } from '@store/states/payers.state';
import { addIcons } from 'ionicons';
import { trash, warning } from 'ionicons/icons';
import { BehaviorSubject } from 'rxjs';
@Component({
  imports: [
    IonLabel,
    CommonModule,
    FormsModule,
    NamedHeaderComponent,
    IonInput,
    IonContent,
    IonItem,
    IonList,
    IonButton,
    ReactiveFormsModule,
    TitleCasePipe,
    IonAvatar,
    NgOptimizedImage,
    IonListHeader,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    DismissibleToastComponent,
  ],
  selector: 'app-payers',
  standalone: true,
  styleUrls: ['./payers.page.scss'],
  templateUrl: './payers.page.html',
})
export class PayersPage implements OnInit {
  errorToastMessage = signal(
    'Please enter a valid payer name. Match characters: a-zA-Z0-9 and spaces.'
  );
  payerForm = new FormGroup({
    payerName: new FormControl('', [
      Validators.pattern(/^[a-zA-Z0-9\s]+$/),
      Validators.required,
      Validators.maxLength(22),
    ]),
  });
  payersList: { name: string; tobeDeleted: boolean }[] = [];

  payersStateSubject$: BehaviorSubject<PayersState>;

  showErrorToast = signal(false);

  constructor(private storeService: StoreService) {
    addIcons({ trash, warning });

    this.payersStateSubject$ = this.storeService.payersService.get();
  }

  addPayer(payer: string) {
    if (!payer || payer.trim() === '') {
      return;
    }
    this.storeService.payersService.addPayer(payer.trim());
  }

  handleToastDismissed() {
    this.showErrorToast.set(false);
  }

  ngOnInit() {
    this.payersStateSubject$.subscribe(() => {
      this.payersList = this.payersStateSubject$
        .getValue()
        .payers.map((payer) => ({ name: payer.name, tobeDeleted: false }));
    });
  }

  onPayerFormSubmit() {
    if (this.payerForm.invalid || !this.payerForm.value.payerName) {
      this.showToast();
      return;
    }
    this.addPayer(this.payerForm.value.payerName);
    this.payerForm.reset();
  }

  removePayer(payer: string) {
    if (!payer || payer.trim() === '') {
      return;
    }
    console.log('Removing payer:', payer.trim());
    this.payersList = this.payersList.map((p) =>
      p.name === payer.trim() ? { ...p, tobeDeleted: true } : p
    );
    // Delay the actual removal to allow UI to update
    setTimeout(() => {
      this.storeService.payersService.removePayer(payer.trim());
    }, 1000);
  }

  showToast() {
    this.showErrorToast.set(true);
  }
}
