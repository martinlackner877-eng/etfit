import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer';
import { NavbarComponent } from './components/navbar/navbar';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner';
// NEU: Imports für das Formular
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  // NEU: ReactiveFormsModule hier hinzufügen!
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent, CookieBannerComponent, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'ETFIT';

  // --- NEU: LOGIK FÜR DEN NEWSLETTER ---
  private fb = inject(FormBuilder);

  newsletterForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    'bot-field': [''] // Honeypot
  });

  isSubmitted = false;
  isError = false;

  async onNewsletterSubmit() {
    if (this.newsletterForm.invalid) return;

    // Honeypot Check
    if (this.newsletterForm.get('bot-field')?.value) return;

    const body = new URLSearchParams();
    body.set('form-name', 'launch-list'); // Name der Liste in Netlify
    body.set('email', this.newsletterForm.get('email')?.value);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });

      this.isSubmitted = true;
      this.newsletterForm.reset();

    } catch (e) {
      console.error(e);
      this.isError = true;
    }
  }
}
