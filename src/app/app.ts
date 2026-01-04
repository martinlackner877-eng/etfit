import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isSubmitting = false;
  isSubmitted = false;

  onNotifySubmit(event: Event, emailInput: HTMLInputElement) {
    event.preventDefault();

    if (this.isSubmitting || this.isSubmitted) {
      return;
    }

    const email = emailInput.value.trim();
    if (!email) {
      emailInput.focus();
      return;
    }

    this.isSubmitting = true;

    window.setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      console.log('Email eingetragen:', email);
    }, 1500);
  }
}
