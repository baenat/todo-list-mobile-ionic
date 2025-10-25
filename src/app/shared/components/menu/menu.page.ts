import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
} from '@ionic/angular/standalone';

export interface Menu {
  icon: string;
  name: string;
  redirectTo: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonIcon,
    RouterLink,
  ]
})
export class MenuPage implements OnInit {

  menu = signal<Menu[]>([
    {
      "icon": "list-outline",
      "name": "Tareas",
      "redirectTo": "/task"
    },
    {
      "icon": "bookmarks-outline",
      "name": "Categorías",
      "redirectTo": "/categories"
    }
  ]);

  constructor() { }

  ngOnInit() {
  }

}
