import { Component, OnInit, signal } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { Menu, MenuPage } from "@shared/components/menu/menu.page";
import { RemoteConfigService } from '@shared/services/remote-config/remote-config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonSplitPane, MenuPage],
})
export class AppComponent implements OnInit {

  constructor(
    private remoteConfigService: RemoteConfigService
  ) { }

  ngOnInit() {
    this.loadInitConfig();
  }

  async loadInitConfig() {
    await this.remoteConfigService.initializeRemoteConfig();
  }
}
