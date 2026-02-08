import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  navigationLinks = [
    { label: 'Startseite', route: '/' },
    { label: 'Das GYM', route: '/', fragment: 'space' },
    { label: 'Mitgliedschaft', route: '/', fragment: 'membership' },
    { label: 'Kontakt', route: '/contact' }
  ];

  contactInfo = [
    { label: 'Kreuzner Straße 537', type: 'address' },
    { label: '9710 Feistritz an der Drau', type: 'address' },
    { label: 'office@et-fit.at', type: 'email' },
    { label: 'mama sita^numma ', type: 'phone' }
  ];

  socialLinks = [
    { icon: 'instagram', href: 'https://instagram.com/etfit.studio', label: 'Instagram' },
    { icon: 'facebook', href: 'https://facebook.com/etfit', label: 'Facebook' }
  ];

  footerLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' }
  ];
}
