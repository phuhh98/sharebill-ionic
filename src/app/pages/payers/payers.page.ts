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
import { addIcons } from 'ionicons';
import { trash, warning } from 'ionicons/icons';
import { Subject } from 'rxjs';

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
  payersList: string[] = [];
  payersSubject$ = new Subject<string>();

  showErrorToast = signal(false);
  constructor() {
    addIcons({ trash, warning });
  }

  addPayer(payer: string) {
    if (!payer || payer.trim() === '') {
      return;
    }
    this.payersSubject$.next(payer.trim());
  }

  handleToastDismissed() {
    this.showErrorToast.set(false);
  }

  ngOnInit() {
    this.payersSubject$.subscribe((payerName: string) => {
      this.payersList.push(payerName);
      this.payerForm.reset();
    });
  }

  onPayerFormSubmit() {
    if (this.payerForm.invalid || !this.payerForm.value.payerName) {
      this.showToast();
      return;
    }
    this.addPayer(this.payerForm.value.payerName);
  }

  showToast() {
    this.showErrorToast.set(true);
  }
}
