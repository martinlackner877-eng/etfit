import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Optional, aber fetch reicht auch

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <--- WICHTIG: ReactiveFormsModule hier rein!
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactPageComponent {
  private fb = inject(FormBuilder);

  // Das Formular-Model definieren
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''], // Optional
    message: ['', [Validators.required, Validators.minLength(10)]],
    'bot-field': [''] // Honeypot für Netlify
  });

  isSubmitting = false;
  formSuccess = false;
  formError = false;
  errorMessage = 'Beim Senden ist etwas schiefgelaufen.';

  get f() { return this.contactForm.controls; } // Helper für HTML Zugriff

  async onSubmit() {
    // 1. Validierung prüfen
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // Zeigt alle roten Rahmen an
      return;
    }

    // 2. Honeypot prüfen (Spam Schutz)
    if (this.contactForm.get('bot-field')?.value) {
      return; // Wenn Bot-Feld ausgefüllt, brich stillschweigend ab
    }

    this.isSubmitting = true;
    this.formError = false;
    this.formSuccess = false;

    // 3. Daten für Netlify vorbereiten
    const body = new URLSearchParams();
    body.set('form-name', 'contact'); // WICHTIG: Der Name aus dem HTML (name="contact")

    // Werte aus dem Formular holen
    Object.keys(this.contactForm.value).forEach(key => {
      body.set(key, this.contactForm.value[key]);
    });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });

      if (response.ok) {
        this.formSuccess = true;
        this.contactForm.reset();
      } else {
        this.formError = true;
      }
    } catch (error) {
      console.error(error);
      this.formError = true;
    } finally {
      this.isSubmitting = false;
    }
  }
}
