// src/app/experience/experience.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule], // Add for directives like *ngFor
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  jobs = [
    {
      title: 'Game Development Intern',
      company: 'Retro Studios',
      dates: 'June 2024 - August 2024',
      tasks: ['Designed Pikachu sprites for NES game.', 'Optimized collision detection.']
    },
    {
      title: 'Front-End Developer',
      company: 'Tech Solutions',
      dates: 'January 2025 - Present',
      tasks: ['Built Angular web app.', 'Improved load time with lazy loading.']
    }
  ];
}