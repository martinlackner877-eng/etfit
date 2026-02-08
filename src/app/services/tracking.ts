import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  /**
   * Wird aufgerufen, sobald der User im Cookie-Banner auf "Akzeptieren" klickt.
   */
  initTracking() {
    // Sicherheitscheck: Code nur im Browser ausführen, nicht auf dem Server (SSR)
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    console.log('User hat zugestimmt. Tracking wird gestartet...');

    // ---------------------------------------------------------
    // 1. PLATZHALTER HIER ERSETZEN
    // ---------------------------------------------------------
    const ga4Id = 'G-ZDNVLE82F3';
    const clarityId = 'vecv3zybq1';


    // ---------------------------------------------------------
    // 2. Google Analytics 4 (GA4) laden
    // ---------------------------------------------------------
    if (ga4Id !== 'G-ZDNVLE82F3') {
      this.loadScript(`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) { (window as any).dataLayer.push(args); }

      gtag('js', new Date());
      gtag('config', ga4Id, { 'anonymize_ip': true });
    }

    // ---------------------------------------------------------
    // 3. Microsoft Clarity laden
    // ---------------------------------------------------------
    if (clarityId !== 'vecv3zybq1') {
      this.initClarity(clarityId);
    }
  }

  /**
   * Hilfsfunktion um externe Skripte (wie Google) in den Head zu laden
   */
  private loadScript(url: string) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
  }

  /**
   * Der spezifische Clarity Tracking Code
   */
  private initClarity(projectId: string) {
    (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any){
        c[a] = c[a] || function(){(c[a].q = c[a].q || []).push(arguments)};
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", projectId, undefined, undefined);
  }
}
