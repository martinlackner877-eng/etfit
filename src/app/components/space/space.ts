import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-space',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './space.html',
  styleUrl: './space.scss'
})
export class SpaceComponent implements AfterViewInit, OnDestroy {
  @ViewChild('spaceSection') spaceSectionRef!: ElementRef;
  @ViewChild('horizontalInner') horizontalInnerRef!: ElementRef;
  @ViewChild('horizontalOuter') horizontalOuterRef!: ElementRef; // Referenz für den Void-Container

  // Canvas Referenz ist WEG

  private tl: gsap.core.Timeline | undefined;
constructor(private ngZone: NgZone) {} // <--- NgZone
ngAfterViewInit(): void {
  this.ngZone.runOutsideAngular(() => {
    setTimeout(() => {
      this.initSpaceAnimation(); // bzw. initScrollAnimation()
    }, 100); // Timeout kann sogar kürzer sein (z.B. 10ms), da wir eh ausserhalb sind
  });
}

  ngOnDestroy(): void {
    if (this.tl) this.tl.kill();
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  initSpaceAnimation() {
    const section = this.spaceSectionRef.nativeElement;
    const innerTrack = this.horizontalInnerRef.nativeElement;
    const outerTrack = this.horizontalOuterRef.nativeElement;

    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: 'top top',
        end: '+=4000', // Scroll-Distanz
        scrub: 1,
      }
    });

    /* --- ZAHL 1: 1.200 --- */
    this.tl.fromTo('.stat-1',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power4.out' }
    )
    // Nur Color Fill, keine Explosion
    .to('.stat-1 .giant-number', { color: '#ED440D', duration: 0.2 }, '-=0.5')
    .to('.stat-1', { scale: 5, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.5');


    /* --- ZAHL 2: 300 --- */
    this.tl.fromTo('.stat-2',
      { scale: 0.5, opacity: 0, rotation: -10 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }
    )
    .to('.stat-2 .giant-number', { color: '#ED440D', duration: 0.2 }, '-=0.5')
    .to('.stat-2', { x: '-100vw', opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.5');


    /* --- ZAHL 3: 100+ --- */
    this.tl.fromTo('.stat-3',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .to('.stat-3 .giant-number', { color: '#ED440D', duration: 0.2 }, '-=0.5')
    .to('.stat-3', { opacity: 0, filter: 'blur(20px)', duration: 0.5 }, '+=0.5');


    /* --- REVEAL CONTENT --- */
    // Void-Schleier lüften
    this.tl.to(outerTrack, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.2');


    /* --- HORIZONTAL SCROLL --- */
    this.tl.to(innerTrack, {
      xPercent: -66.66,
      ease: 'none',
      duration: 5
    });

    /* --- PARALLAX --- */
    gsap.utils.toArray<HTMLElement>('.panel-visual img').forEach((img) => {
      gsap.to(img, {
        scale: 1,
        scrollTrigger: {
          trigger: img.closest('.panel'),
          containerAnimation: this.tl,
          start: 'left center',
          end: 'right center',
          scrub: true
        }
      });
    });
  }
}
// Particle Klasse ist WEG
