import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ExploreCard {
  title: string;
  description: string;
  href: string;
  route?: string;
  color: string;
  icon: 'book' | 'trophy' | 'link';
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  readonly cards: ExploreCard[] = [
    {
      title: 'Guestbook',
      description: 'Leave your mark and see what others have to say',
      href: '/guestbook',
      route: '/guestbook',
      color: '#7c3aed',
      icon: 'book',
    },
    {
      title: 'Achievements',
      description: 'Milestones, certifications, and accomplishments',
      href: '/achievements',
      route: '/achievements',
      color: '#f97316',
      icon: 'trophy',
    },
    {
      title: 'My Links',
      description: 'Find me across the web and social platforms',
      href: '/links',
      route: '/links',
      color: '#3b82f6',
      icon: 'link',
    },
  ];
}
