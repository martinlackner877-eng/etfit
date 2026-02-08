import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, NgZone} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membership.html',
  styleUrl: './membership.scss'
})
export class MembershipComponent implements AfterViewInit, OnDestroy {
  @ViewChild('plansContainer') plansContainerRef!: ElementRef;

  private tl: gsap.core.Timeline | undefined;


  constructor(private ngZone: NgZone) {} // <--- NgZone


  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // Längerer Timeout (500ms), um sicher zu sein, dass Angular fertig ist
      setTimeout(() => {
        this.initScrollAnimation();
      }, 500);
    });
  }

  ngOnDestroy(): void {
    if (this.tl) this.tl.kill();
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  initScrollAnimation() {
    const container = this.plansContainerRef.nativeElement;

    // Debugging: Loggen, ob Container gefunden wurde
    console.log("Membership Container:", container);
    if (!container) return;

    // Refresh erzwingen bevor wir starten
    ScrollTrigger.refresh();

    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        // start: "top bottom" -> Startet sobald die OBERKANTE des Containers den BODEN des Screens berührt
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        markers: true // <--- WICHTIG: Das zeigt dir Linien auf dem Bildschirm an!
      }
    });

    // Wir nutzen fromTo -> Das ist sicherer als from
    // 1. Header
    this.tl.fromTo('.membership-section .headline, .membership-section .subline, .header-accent',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );

    // 2. Äußere Karten
    this.tl.fromTo(['.plan-card.starter', '.plan-card.legend'],
      { x: (i) => i === 0 ? -50 : 50, opacity: 0, rotationY: (i) => i === 0 ? -10 : 10 },
      { x: 0, opacity: 1, rotationY: 0, duration: 0.8, ease: 'back.out(1.2)' },
      '-=0.2'
    );

    // 3. Pro Karte
    this.tl.fromTo('.plan-card.pro',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.6)' },
      '-=0.6'
    );

    // 4. Badge
    this.tl.fromTo('.most-popular-badge',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' },
      '-=0.8'
    );
  }
}
