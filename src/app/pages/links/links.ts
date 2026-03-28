import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-links-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './links.html',
  styleUrl: './links.css',
})
export class LinksPageComponent {
  readonly links = [
    {
      name: 'GitHub',
      href: 'https://github.com/tu-usuario',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/tu-usuario',
      icon: 'linkedin',
    },
    {
      name: 'Email',
      href: 'mailto:tu@email.com',
      icon: 'email',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/tu-usuario',
      icon: 'instagram',
    },
  ];
}
