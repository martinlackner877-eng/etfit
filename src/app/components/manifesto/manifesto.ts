import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-manifesto',
  templateUrl: './manifesto.html',
  styleUrls: ['./manifesto.scss']
})
export class ManifestoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('filledText') filledTextRef!: ElementRef;
  @ViewChild('sparkCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private particles: any[] = [];
  private animationFrameId: number = 0;
  private ctx!: CanvasRenderingContext2D | null;

  ngAfterViewInit(): void {
    // WICHTIG: Kurze Verzögerung, damit das Layout steht
    setTimeout(() => {
      this.initScrollAnimation();
      this.initParticles();
    }, 100);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  private initScrollAnimation() {
    const section = this.containerRef.nativeElement;
    const text = this.filledTextRef.nativeElement;

    // GSAP Timeline
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", // Wenn Sektion oben andockt
        end: "+=150%",   // Wie lange wir scrollen (150% der Viewport-Höhe)
        scrub: 0.5,      // Sanftes Nachziehen
        pin: true,       // Hält die Sektion fest! (Das ersetzt position: sticky)
        anticipatePin: 1 // Verhindert Ruckeln
      }
    })
    .to(text, {
      // Ändert den Clip-Path von "100% versteckt" zu "0% versteckt"
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none"
    });
  }

  private initParticles() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    // Retina Display Support & Resizing
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    // Partikel Klasse (Verbesserte Physik)
    class Spark {
      x: number;
      y: number;
      size: number;
      speedY: number;
      wobble: number; // Für seitliches Driften
      wobbleSpeed: number;
      opacity: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 100; // Startet unterhalb
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 2 + 1;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.05;
        this.opacity = Math.random() * 0.8 + 0.2;
      }

      update(h: number) {
        this.y -= this.speedY; // Nach oben
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5; // Leichtes Driften

        this.opacity -= 0.003; // Langsames Verblassen

        // Reset wenn oben raus oder unsichtbar
        if (this.y < -50 || this.opacity <= 0) {
          this.y = h + 50;
          this.x = Math.random() * window.innerWidth;
          this.opacity = 1;
          this.speedY = Math.random() * 2 + 1;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Heißes Orange/Gelb
        ctx.fillStyle = `rgba(255, 140, 0, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(237, 68, 13, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset für Performance
      }
    }

    // Partikel erstellen
    for (let i = 0; i < 60; i++) {
      this.particles.push(new Spark(canvas.width, canvas.height));
    }

    // Animation Loop
    const animate = () => {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.particles.forEach(p => {
        p.update(canvas.height);
        p.draw(this.ctx!);
      });

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }
}
