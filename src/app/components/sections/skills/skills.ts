import { Component, AfterViewInit, ElementRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface SkillCategory {
  label: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  host: {
    class: 'section-reveal',
    '[class.visible]': 'visible()',
  },
})
export class SkillsComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private host = inject(ElementRef);

  visible = signal(false);

  readonly categories: SkillCategory[] = [
    {
      label: 'Frontend',
      skills: ['Angular', 'TypeScript', 'React', 'HTML5', 'CSS3', 'Tailwind CSS', 'RxJS'],
    },
    {
      label: 'Backend',
      skills: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL', 'WebSockets'],
    },
    {
      label: 'Database',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'SQL'],
    },
    {
      label: 'Tools & DevOps',
      skills: ['Git', 'Docker', 'GitHub Actions', 'AWS', 'Vite', 'Linux'],
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
      { threshold: 0.1 },
    );
    obs.observe(this.host.nativeElement);
  }
}
