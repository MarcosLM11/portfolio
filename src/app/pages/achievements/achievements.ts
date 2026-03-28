import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Achievement {
  title: string;
  description: string;
  category: string;
  date: string;
  image?: string; // URL to certificate image — add yours here
}

@Component({
  selector: 'app-achievements-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './achievements.html',
  styleUrl: './achievements.css',
})
export class AchievementsPageComponent {
  // Add your real achievements here. The first item will be displayed as the featured card.
  readonly achievements: Achievement[] = [];
}
