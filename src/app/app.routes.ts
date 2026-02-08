import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home';
import { ContactPageComponent } from './pages/contact/contact';

export const routes: Routes = [
	{ path: '', component: HomePageComponent },
	{ path: 'contact', component: ContactPageComponent },
	{ path: '**', redirectTo: '' }
];
