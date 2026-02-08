import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core'; // <--- 1. IMPORT HINZUFÜGEN
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrackingService } from '../../services/tracking';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookie-banner.html', // (Pass auf, ob .html oder .component.html)
  styleUrl: './cookie-banner.scss'
})
export class CookieBannerComponent implements OnInit {
  isVisible = false;

  constructor(
    private trackingService: TrackingService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef // <--- 2. HIER INJIZIEREN
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const consent = localStorage.getItem('cookie-consent');
      console.log('🔍 Speicher-Check:', consent);

      if (!consent) {
        console.log('✅ Kein Consent -> Banner aktivieren...');

        setTimeout(() => {
          this.isVisible = true;

          // <--- 3. DER FIX: ANGULAR ZWINGEN, ZU RENDERN
          this.cdr.detectChanges();
          console.log('Force Update ausgeführt. isVisible ist jetzt:', this.isVisible);

        }, 1500);

      } else if (consent === 'true') {
        this.trackingService.initTracking();
      }
    }
  }

  acceptAll() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookie-consent', 'true');
      this.trackingService.initTracking();
      this.isVisible = false;
    }
  }

  rejectAll() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookie-consent', 'false');
      this.isVisible = false;
    }
  }
}
