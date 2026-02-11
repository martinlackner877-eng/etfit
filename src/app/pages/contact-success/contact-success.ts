import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-success.html',
  styleUrl: './contact-success.scss',
})
export class ContactSuccessComponent {}
