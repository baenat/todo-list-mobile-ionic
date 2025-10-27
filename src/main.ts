import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { appProviders } from '@data/providers/providers';
import { addIcons } from 'ionicons';
import { add, arrowBackOutline, bookmarksOutline, close, colorPalette, home, list, menu, pencil, settings, trash } from 'ionicons/icons';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

addIcons({
  'trash-outline': trash,
  'menu-outline': menu,
  'add-outline': add,
  'close-outline': close,
  'list-outline': list,
  'bookmarks-outline': bookmarksOutline,
  'home-outline': home,
  'settings-outline': settings,
  'pencil-outline': pencil,
  'color-palette-outline': colorPalette,
  'arrow-back-outline': arrowBackOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    /* Firebase */
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    ...appProviders
  ],
});
