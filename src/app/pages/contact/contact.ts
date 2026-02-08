import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactPageComponent {
  isSubmitting = false;
  formSuccess = false;
  formError = false;
  errorMessage = 'Beim Senden ist etwas schiefgelaufen. Bitte versuch es erneut.';

  async onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.isSubmitting) {
      return;
    }

    const form = event.target as HTMLFormElement | null;
    if (!form) {
      return;
    }

    this.formSuccess = false;
    this.formError = false;
    this.isSubmitting = true;

    const formData = new FormData(form);
    const body = new URLSearchParams();

    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        body.append(key, value);
      }
    });



    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
  console.log('Response Status:', response.status); // DEBUG
  console.log('Response:', response); // DEBUG
      if (response.ok) {
        this.formSuccess = true;
        form.reset();
      } else {
        this.formError = true;
      }
    } catch (error) {
      console.error('Fetch Error:', error); // DEBUG
      this.formError = true;

    }
  }
}
