// projects.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'NES Pikachu Game',
      description: 'Developed animations and collision detection for an NES game.',
      tech: '6502 Assembly, Mesen',
      links: { github: '[URL]', demo: '[URL]' }
    },
    {
      title: 'Angular Resume Website',
      description: 'Built a responsive resume site using Angular.',
      tech: 'Angular, TypeScript, HTML/CSS',
      links: { github: '[URL]', demo: '[URL]' }
    }
  ];
}