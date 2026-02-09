import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home';
import { ContactPageComponent } from './pages/contact/contact';
import { ThankYouComponent } from './pages/thank-you/thank-you';


export const routes: Routes = [
	{ path: '', component: HomePageComponent },
	{ path: 'contact', component: ContactPageComponent },
	{ path: 'thank-you', component: ThankYouComponent },
	{ path: '**', redirectTo: '' }
];
