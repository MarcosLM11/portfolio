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
      href: 'https://github.com/MarcosLM11',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/marcos-lopez-marin-356734345/',
      icon: 'linkedin',
    },
    {
      name: 'Email',
      href: 'mailto:marcoslopezmarinn@gmail.com',
      icon: 'email',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/tu-usuario',
      icon: 'instagram',
    },
  ];
}
