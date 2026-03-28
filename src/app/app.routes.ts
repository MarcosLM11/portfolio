import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LinksPageComponent } from './pages/links/links';
import { GuestbookPageComponent } from './pages/guestbook/guestbook';
import { AchievementsPageComponent } from './pages/achievements/achievements';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'links', component: LinksPageComponent },
  { path: 'guestbook', component: GuestbookPageComponent },
  { path: 'achievements', component: AchievementsPageComponent },
  { path: '**', redirectTo: '' },
];
