import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactPageComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    'bot-field': [''] // Honeypot
  });

  isSubmitting = false;
  formSuccess = false;
  formError = false;

  get f() { return this.contactForm.controls; }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // Honeypot Check (Spam-Schutz)
    if (this.contactForm.get('bot-field')?.value) {
      return;
    }

    this.isSubmitting = true;
    this.formError = false;
    this.formSuccess = false;

    const formData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      message: this.contactForm.value.message
    };

    // An dein PHP Skript senden
    this.http.post('https://et-fit.at/mail.php', formData).subscribe({
      next: () => {
        this.formSuccess = true;
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Fehler beim Senden:', error);
        this.formError = true;
        this.isSubmitting = false;
      }
    });
  }
}
