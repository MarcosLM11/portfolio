import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
})
export class HeroComponent {
  private platformId = inject(PLATFORM_ID);

  scrollTo(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
