import { Component, AfterViewInit, ElementRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Project {
  num: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  host: {
    class: 'section-reveal',
    '[class.visible]': 'visible()',
  },
})
export class ProjectsComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private host = inject(ElementRef);

  visible = signal(false);

  readonly projects: Project[] = [
    {
      num: '01',
      title: 'E-Commerce Platform',
      description:
        'Full-stack e-commerce solution with real-time inventory management, Stripe payments, and an admin dashboard. Built for scale with a clean domain model.',
      tech: ['Angular', 'Node.js', 'PostgreSQL', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      num: '02',
      title: 'Collaborative Task Manager',
      description:
        'Real-time project management tool with drag-and-drop boards, live updates via WebSockets, and team analytics. Handles concurrent edits gracefully.',
      tech: ['React', 'Express', 'Socket.io', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      num: '03',
      title: 'Developer Portfolio',
      description:
        'This portfolio — an Angular 21 SSR application with pre-rendering, Tailwind CSS v4, and a focus on accessibility and performance.',
      tech: ['Angular 21', 'Tailwind v4', 'SSR', 'Vitest'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(this.host.nativeElement);
  }
}
