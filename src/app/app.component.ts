import { Component, signal } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { Menu, MenuPage } from "@shared/components/menu/menu.page";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonSplitPane, MenuPage],
})
export class AppComponent {
  constructor() { }
}
