import { Component } from '@angular/core';

interface SocialLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly socialLinks: SocialLink[] = [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
  ];
}
