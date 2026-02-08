import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {

  // Referenz zum Canvas holen
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('bgVideo') videoRef!: ElementRef<HTMLVideoElement>;

  private animationFrameId: number = 0;
  private ctx: CanvasRenderingContext2D | null = null;

  // NgZone injizieren
  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {

    const video = this.videoRef.nativeElement;
    video.muted = true; // WICHTIG: Per Code stummschalten, HTML reicht oft nicht!
    video.play().catch(err => {
      console.log('Autoplay wurde blockiert (z.B. Low Power Mode):', err);
    });
    // Alles was Animation ist, raus aus der Zone!
    this.ngZone.runOutsideAngular(() => {
      this.animateHeroLoad();
      this.animateHeroScroll();
      this.initParticles();
    });
  }
ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    // Wichtig: ScrollTrigger aufräumen
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
  // ========== EXISTING GSAP LOGIC ==========
  animateHeroLoad(): void {
    gsap.fromTo('.hero-background',
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 3.5, ease: 'power2.out' }
    );

    const timeline = gsap.timeline({ delay: 0.5 });

    // Logo Animation
    timeline.fromTo('.hero-logo',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      0
    );


    // Restlicher Content
    timeline.fromTo(['.hero-badge', '.hero-headline', '.hero-subline', '.hero-button'],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15 },
      0.3
    );
  }

  animateHeroScroll(): void {
    gsap.to('.hero-background', {
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      y: (i, target) => -window.innerHeight * 0.3// Parallax Effekt: 20% der Viewport-Höhe nach oben
    });
  }

  // ========== NEU: PARTIKEL LOGIK ==========
  private initParticles() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', {alpha: true });
    if (!this.ctx) return;

    // Canvas Größe setzen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
   x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      canvasHeight: number;
      canvasWidth: number;

      constructor(w: number, h: number) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 1 + 0.2;
        this.opacity = Math.random() * 0.6 + 0.1;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * 0.01) * 0.5; // Weniger Sinus-Berechnung
        this.opacity -= 0.003;

        if (this.opacity <= 0 || this.y + this.size < 0) {
          this.y = this.canvasHeight + 10;
          this.x = Math.random() * this.canvasWidth;
          this.opacity = Math.random() * 0.6 + 0.7;
          this.speedY = Math.random() * 1.5 + 0.8;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 68, 13, ${this.opacity})`;
        // ShadowBlur ist SEHR teuer -> Nur bei wenigen oder gar nicht nutzen
        // ctx.shadowBlur = 8; <--- Performance Killer Nr. 1, raus damit oder reduzieren
        ctx.fill();
      }
    }

    // Reduziere Partikelanzahl mobil drastisch
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 100; // 560 waren VIEL zu viele!

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    const animate = () => {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Global Composite Operation nur einmal setzen
      this.ctx.globalCompositeOperation = 'lighter';

      particles.forEach(p => {
        p.update();
        p.draw(this.ctx!);
      });

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }
}
