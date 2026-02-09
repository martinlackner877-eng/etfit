import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer';
import { NavbarComponent } from './components/navbar/navbar';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner';

@Component({
  selector: 'app-root',
  standalone: true,
  // ReactiveFormsModule brauchen wir nicht mehr, da Brevo das übernimmt
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent, CookieBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'ETFIT';

}
