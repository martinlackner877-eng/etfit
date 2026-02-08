import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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

  private animationFrameId: number = 0;

  ngAfterViewInit(): void {
    this.animateHeroLoad();
    this.animateHeroScroll();
    this.initParticles();
  }

  ngOnDestroy(): void {
    // Animation stoppen wenn Komponente zerstört wird
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
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
        onUpdate: (self) => {
          gsap.to('.hero-background', {
            y: self.getVelocity() * -0.3,
            overwrite: false,
            duration: 0.5
          });
        }
      }
    });
  }

  // ========== NEU: PARTIKEL LOGIK ==========
  private initParticles() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

      constructor() {
        // Startet irgendwo entlang des Lichtstrahls (Mitte des Screens)
        // x = Mitte +/- 20px (damit sie aus dem Strahl kommen)
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height; // Zufällige Höhe beim Start
        this.size = Math.random() * 2 + 0.5; // Größe
        this.speedY = Math.random() * 1 + 0.2; // Langsames Aufsteigen
        this.opacity = Math.random() * 0.6 + 0.1; // Subtilere Transparenz
      }

      update() {
this.y -= this.speedY; // Nach oben bewegen

        // Optional: Leichtes seitliches Driften für mehr Natürlichkeit
        this.x += Math.sin(this.y * 0.01) * 0.9;

        this.opacity -= 0.003; // Sehr langsames Verblassen

        // Reset wenn unsichtbar oder oben raus
        if (this.opacity <= 0 || this.y + this.size < 0) {
          this.y = canvas.height + 10; // Neustart knapp unter dem Bildschirm
          // ÄNDERUNG: Auch beim Reset zufällige X-Position über volle Breite
          this.x = Math.random() * canvas.width;
          this.opacity = Math.random() * 0.6 + 0.7;
          this.speedY = Math.random() * 1.5 + 0.8;
        }
      }

      draw() {
    if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Dein Orange (#ED440D)
        ctx.fillStyle = `rgba(237, 68, 13, ${this.opacity})`;

        // Leichter Glow-Effekt für die Partikel
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(237, 68, 13, 0.5)';
        ctx.fill();
        // Shadow resetten für Performance
        ctx.shadowBlur = 0;
      }
    }

    // Wir erstellen 60 Partikel
    const particles: Particle[] = [];
    for (let i = 0; i < 560; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = 'lighter';
      // Partikel zeichnen
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }
}
