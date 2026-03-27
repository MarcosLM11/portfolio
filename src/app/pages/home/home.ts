import { Component } from '@angular/core';
import { HomeComponent } from '../../components/sections/home/home';
import { AboutComponent } from '../../components/sections/about/about';
import { SkillsComponent } from '../../components/sections/skills/skills';
import { ProjectsComponent } from '../../components/sections/projects/projects';
import { ContactComponent } from '../../components/sections/contact/contact';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeComponent, AboutComponent, SkillsComponent, ProjectsComponent, ContactComponent],
  templateUrl: './home.html',
})
export class HomeComponentPage {}
