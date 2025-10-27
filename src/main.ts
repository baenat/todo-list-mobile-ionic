import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { addIcons } from 'ionicons';
import { add, trash, close, menu, list, bookmarks, home, settings, pencil, colorPalette } from 'ionicons/icons';
import { appProviders } from '@data/providers/providers';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

addIcons({
  'trash-outline': trash,
  'menu-outline': menu,
  'add-outline': add,
  'close-outline': close,
  'list-outline': list,
  'bookmarks-outline': bookmarks,
  'home-outline': home,
  'settings-outline': settings,
  'pencil-outline': pencil,
  'color-palette-outline': colorPalette,
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
