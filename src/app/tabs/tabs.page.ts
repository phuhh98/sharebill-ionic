import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calculator, ellipse, image, people, receipt, square, triangle } from 'ionicons/icons';

@Component({
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  selector: 'app-tabs',
  styleUrls: ['tabs.page.scss'],
  templateUrl: 'tabs.page.html',
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ calculator, ellipse, image, people, receipt, square, triangle });
  }
}
