import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const section: HTMLElement = this.el.nativeElement;
    const rect = section.getBoundingClientRect();

    // Skip animation if already in view at load time
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>('.about-card'));
    cards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(28px)';
    });

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.transition =
                  'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, i * 90);
            });
            this.observer?.disconnect();
          }
        },
        { threshold: 0.06 },
      );
      this.observer.observe(section);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
