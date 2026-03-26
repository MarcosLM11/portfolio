import { Component, AfterViewInit, ElementRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  host: {
    class: 'section-reveal',
    '[class.visible]': 'visible()',
  },
})
export class AboutComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private host = inject(ElementRef);

  visible = signal(false);

  readonly stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Shipped' },
    { value: '10+', label: 'Tech Stack' },
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
