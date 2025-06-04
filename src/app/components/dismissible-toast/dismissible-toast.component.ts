import { Component, input, output } from '@angular/core';
import { IonToast } from '@ionic/angular/standalone';

enum ToastAnchorEnum {
  HEADER_TITLE = 'header-title',
  TAB_BAR = 'tab-bar',
}

enum ToastPositionEnum {
  BOTTOM = 'bottom',
  TOP = 'top',
}

type ToastPosition = `${ToastPositionEnum}`;

@Component({
  imports: [IonToast],
  selector: 'app-dismissible-toast',
  standalone: true,
  styleUrls: ['./dismissible-toast.component.scss'],
  templateUrl: './dismissible-toast.component.html',
})
export class DismissibleToastComponent {
  message = input<string>('Toast message');
  position = input<ToastPosition>('top');
  showToast = input<boolean>(false);
  ToastAnchorEnum = ToastAnchorEnum;
  toastDismissed = output<boolean>();
  ToastPositionEnum = ToastPositionEnum;
  constructor() {}

  onDismiss() {
    this.toastDismissed.emit(true);
  }
}
