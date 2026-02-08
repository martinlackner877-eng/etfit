import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      // Animation beim Öffnen
      // Warte kurz (0.4s), bis der schwarze Hintergrund unten ist, dann Text reinfliegen lassen
      gsap.fromTo('.menu-item',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1, // Jeder Punkt kommt 0.1s später
          ease: 'power3.out',
          delay: 0.3
        }
      );
    } else {
      // Animation beim Schließen (optional, hier reicht CSS)
    }
  }

  // Hover Sound Effekt (Optional: Extravagant!)
  onHover(event: MouseEvent) {
    // Hier könnte man später einen metallischen Sound abspielen
  }

  onLeave(event: MouseEvent) {
  }
}
