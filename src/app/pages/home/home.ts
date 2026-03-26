import { Component } from '@angular/core';
import { HeroComponent } from '../../components/sections/hero/hero';
import { AboutComponent } from '../../components/sections/about/about';
import { SkillsComponent } from '../../components/sections/skills/skills';
import { ProjectsComponent } from '../../components/sections/projects/projects';
import { ContactComponent } from '../../components/sections/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent, ContactComponent],
  templateUrl: './home.html',
})
export class HomeComponent {}
