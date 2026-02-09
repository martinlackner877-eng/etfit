import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home';
import { ContactPageComponent } from './pages/contact/contact';
import { CheckMailComponent } from './pages/check-mail/check-mail';
import { NotFoundComponent } from './pages/not-found/not-found';
// NEU IMPORTIEREN:
import { SuccessComponent } from './pages/success/success';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contact', component: ContactPageComponent },

{ path: 'check-mail', component: CheckMailComponent },

  // SEITE 2: GRÜN (Erfolg) -> Für ManyChat / Bestätigungslink
  { path: 'success', component: SuccessComponent },
	{ path: '**', component: NotFoundComponent }
];
