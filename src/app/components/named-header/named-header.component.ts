import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  imports: [IonHeader, IonTitle, IonToolbar, TitleCasePipe],
  selector: 'app-named-header',
  standalone: true,
  styleUrls: ['./named-header.component.scss'],
  templateUrl: './named-header.component.html',
})
export class NamedHeaderComponent {
  title = input<string>('Default title');
  constructor() {}
}
