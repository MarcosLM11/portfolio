import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LinksPageComponent } from './pages/links/links';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'links', component: LinksPageComponent },
  { path: '**', redirectTo: '' },
];
