import { Component, OnInit, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  activeSection = signal<string>('hero');

  private observer?: IntersectionObserver;

  readonly navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Other', id: 'contact' },
  ];

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    );

    setTimeout(() => {
      document.querySelectorAll('section[id]').forEach((s) => this.observer!.observe(s));
    }, 100);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
