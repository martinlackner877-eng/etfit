import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // <--- NEU: Router importieren

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
  private router = inject(Router); // <--- NEU: Router "einspritzen"

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    'bot-field': ['']
  });

  isSubmitting = false;
  formError = false;

  get f() { return this.contactForm.controls; }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (this.contactForm.get('bot-field')?.value) {
      return;
    }

    this.isSubmitting = true;
    this.formError = false;

    const formData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      message: this.contactForm.value.message
    };

    // An PHP senden
    this.http.post('https://www.et-fit.at/mail.php', formData).subscribe({
      next: () => {
        // HIER PASSIERT DIE MAGIE:
        this.isSubmitting = false;
        this.contactForm.reset();
        // Weiterleiten zur Success-Seite
        this.router.navigate(['/contact-success']);
      },
      error: (error) => {
        console.error('Fehler:', error);
        this.formError = true;
        this.isSubmitting = false;
      }
    });
  }
}
