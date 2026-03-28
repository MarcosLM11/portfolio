import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  inject,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  siAngular,
  siTypescript,
  siJavascript,
  siReact,
  siHtml5,
  siCss,
  siTailwindcss,
  siNodedotjs,
  siNestjs,
  siPython,
  siPostgresql,
  siMongodb,
  siDocker,
  siGit,
  siGithub,
  siLinux,
  siFigma,
  siGraphql,
} from 'simple-icons';

interface Skill {
  name: string;
  fill: string;
  path: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('globe') private globeRef!: ElementRef<HTMLDivElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private animId?: number;

  // Rotation angles
  private angleY = 0;
  private angleX = 0.22; // initial tilt

  // Drag state
  private isDragging = false;
  private lastX = 0;
  private lastY = 0;
  private velY = 0;
  private velX = 0;

  private readonly SPEED = 0.0008;
  private readonly SENSITIVITY = 0.007;
  private readonly DECAY = 0.93;

  readonly skills: Skill[] = [
    { name: 'Angular', fill: `#${siAngular.hex}`, path: siAngular.path },
    { name: 'TypeScript', fill: `#${siTypescript.hex}`, path: siTypescript.path },
    { name: 'JavaScript', fill: `#${siJavascript.hex}`, path: siJavascript.path },
    { name: 'React', fill: `#${siReact.hex}`, path: siReact.path },
    { name: 'HTML5', fill: `#${siHtml5.hex}`, path: siHtml5.path },
    { name: 'CSS', fill: `#${siCss.hex}`, path: siCss.path },
    { name: 'Tailwind', fill: `#${siTailwindcss.hex}`, path: siTailwindcss.path },
    { name: 'Node.js', fill: `#${siNodedotjs.hex}`, path: siNodedotjs.path },
    { name: 'NestJS', fill: `#${siNestjs.hex}`, path: siNestjs.path },
    { name: 'Python', fill: `#${siPython.hex}`, path: siPython.path },
    { name: 'PostgreSQL', fill: `#${siPostgresql.hex}`, path: siPostgresql.path },
    { name: 'MongoDB', fill: `#${siMongodb.hex}`, path: siMongodb.path },
    { name: 'Docker', fill: `#${siDocker.hex}`, path: siDocker.path },
    { name: 'Git', fill: `#${siGit.hex}`, path: siGit.path },
    { name: 'GitHub', fill: `#${siGithub.hex}`, path: siGithub.path },
    { name: 'Linux', fill: `#${siLinux.hex}`, path: siLinux.path },
    { name: 'Figma', fill: `#${siFigma.hex}`, path: siFigma.path },
    { name: 'GraphQL', fill: `#${siGraphql.hex}`, path: siGraphql.path },
  ];

  private positions: { x: number; y: number; z: number }[] = [];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.buildPositions();

    this.ngZone.runOutsideAngular(() => {
      this.frame();
    });
  }

  ngOnDestroy(): void {
    if (this.animId !== undefined) cancelAnimationFrame(this.animId);
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('pointermove', this.onMove);
      document.removeEventListener('pointerup', this.onUp);
      document.removeEventListener('pointercancel', this.onUp);
    }
  }

  onGlobePointerDown(e: PointerEvent): void {
    this.ngZone.runOutsideAngular(() => this.onDown(e));
  }

  private readonly onDown = (e: PointerEvent): void => {
    e.preventDefault();
    this.isDragging = true;
    this.velY = 0;
    this.velX = 0;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.globeRef.nativeElement.classList.add('dragging');
    document.addEventListener('pointermove', this.onMove);
    document.addEventListener('pointerup', this.onUp);
    document.addEventListener('pointercancel', this.onUp);
  };

  private readonly onMove = (e: PointerEvent): void => {
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.velY = dx * this.SENSITIVITY;
    this.velX = -dy * this.SENSITIVITY;
    this.angleY += this.velY;
    this.angleX += this.velX;
  };

  private readonly onUp = (): void => {
    this.isDragging = false;
    this.globeRef?.nativeElement?.classList.remove('dragging');
    document.removeEventListener('pointermove', this.onMove);
    document.removeEventListener('pointerup', this.onUp);
    document.removeEventListener('pointercancel', this.onUp);
  };

  private buildPositions(): void {
    const n = this.skills.length;
    const golden = (1 + Math.sqrt(5)) / 2;
    this.positions = Array.from({ length: n }, (_, i) => {
      const polar = Math.acos(1 - (2 * (i + 0.5)) / n);
      const azimuth = (2 * Math.PI * i) / golden;
      return {
        x: Math.sin(polar) * Math.cos(azimuth),
        y: Math.cos(polar),
        z: Math.sin(polar) * Math.sin(azimuth),
      };
    });
  }

  private rot(x0: number, y0: number, z0: number): { x: number; y: number; z: number } {
    const ca = Math.cos(this.angleY);
    const sa = Math.sin(this.angleY);
    const ct = Math.cos(this.angleX);
    const st = Math.sin(this.angleX);
    const x1 = x0 * ca + z0 * sa;
    const z1 = -x0 * sa + z0 * ca;
    const y1 = y0 * ct - z1 * st;
    const z2 = y0 * st + z1 * ct;
    return { x: x1, y: y1, z: z2 };
  }

  private frame(): void {
    if (!this.isDragging) {
      if (Math.abs(this.velY) > 0.0001 || Math.abs(this.velX) > 0.0001) {
        // Inertia: apply remaining velocity and decay
        this.angleY += this.velY;
        this.angleX += this.velX;
        this.velY *= this.DECAY;
        this.velX *= this.DECAY;
      } else {
        // Auto-rotation resumes
        this.velY = 0;
        this.velX = 0;
        this.angleY += this.SPEED;
      }
    }

    const globe = this.globeRef?.nativeElement;
    const canvas = this.canvasRef?.nativeElement;
    if (!globe || !canvas) {
      this.animId = requestAnimationFrame(() => this.frame());
      return;
    }

    const w = globe.offsetWidth;
    const h = globe.offsetHeight;
    const r = Math.min(w, h) * 0.42;
    const cx = w / 2;
    const cy = h / 2;

    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    this.drawGrid(canvas, r, cx, cy);
    this.positionBadges(globe, r, cx, cy);

    this.animId = requestAnimationFrame(() => this.frame());
  }

  private drawGrid(canvas: HTMLCanvasElement, r: number, cx: number, cy: number): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(107, 92, 200, 0.13)';
    ctx.lineWidth = 0.75;

    for (let i = 1; i <= 5; i++) {
      const polar = (i / 6) * Math.PI;
      const sp = Math.sin(polar);
      const cp = Math.cos(polar);
      ctx.beginPath();
      for (let j = 0; j <= 72; j++) {
        const az = (j / 72) * Math.PI * 2;
        const p = this.rot(sp * Math.cos(az), cp, sp * Math.sin(az));
        if (j === 0) ctx.moveTo(cx + p.x * r, cy + p.y * r);
        else ctx.lineTo(cx + p.x * r, cy + p.y * r);
      }
      ctx.stroke();
    }

    for (let i = 0; i < 9; i++) {
      const az = (i / 9) * Math.PI;
      ctx.beginPath();
      for (let j = 0; j <= 72; j++) {
        const polar = (j / 72) * Math.PI * 2;
        const sp = Math.sin(polar);
        const p = this.rot(sp * Math.cos(az), Math.cos(polar), sp * Math.sin(az));
        if (j === 0) ctx.moveTo(cx + p.x * r, cy + p.y * r);
        else ctx.lineTo(cx + p.x * r, cy + p.y * r);
      }
      ctx.stroke();
    }
  }

  private positionBadges(globe: HTMLElement, r: number, cx: number, cy: number): void {
    globe.querySelectorAll<HTMLElement>('[data-skill]').forEach((el) => {
      const name = el.dataset['skill'];
      const i = this.skills.findIndex((s) => s.name === name);
      if (i < 0) return;

      const pos = this.positions[i];
      const p = this.rot(pos.x, pos.y, pos.z);
      const px = cx + p.x * r;
      const py = cy + p.y * r;
      const scale = (0.45 + 0.6 * ((p.z + 1) / 2)).toFixed(3);
      const opacity = (0.18 + 0.82 * ((p.z + 1) / 2)).toFixed(3);
      const gsRaw = 1 - Math.max(0, p.z + 0.2) / 1.2;
      const grayscale = Math.round(Math.max(0, Math.min(1, gsRaw)) * 100);

      el.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) translate(-50%, -50%) scale(${scale})`;
      el.style.opacity = opacity;
      el.style.zIndex = String(Math.round(p.z * 100 + 100));
      el.style.filter = grayscale > 0 ? `grayscale(${grayscale}%)` : 'none';

      const label = el.querySelector<HTMLElement>('.skill-label');
      if (label) {
        const front = p.z > 0.42;
        label.style.opacity = front ? '1' : '0';
        label.style.maxWidth = front ? '8rem' : '0';
      }
    });
  }
}
