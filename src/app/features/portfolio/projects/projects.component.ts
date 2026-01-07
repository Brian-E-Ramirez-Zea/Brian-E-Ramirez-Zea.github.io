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
      title: 'Angular Resume Website',
      year: '2025',
      description: 'A personal resume website built with Angular, hosted on GitHub Pages. Features a responsive design and prerendered content for SEO.',
      linkName: 'View on GitHub',
      linkUrl: 'https://github.com/Brian-E-Ramirez-Zea/Brian-E-Ramirez-Zea.github.io',
      isDownload: false
    },
    {
      title: 'NES Game Developer',
      year: '2024',
      description: 'Designed and developed a custom game for the Nintendo Entertainment System (NES) using 6502 Assembly language. Worked in a team to handle low-level programming challenges, including memory management, sprite rendering, and hardware input/output for engaging gameplay mechanics. This project deepened my understanding of embedded systems and retro game development.',
      linkName: 'Download Project (ZIP)',
      linkUrl: 'assets/NES-game.zip',
      isDownload: true
    },
    {
      title: 'Debugging & Mentorship in Advanced Programming',
      year: '2023-2024',
      description: 'Collaborated on debugging and optimizing three C++ games for an advanced programming course. Identified and fixed code issues, improved algorithms, and mentored junior students in subsequent semesters on best practices for code quality, version control with Git, and collaborative development. Enhanced my problem-solving and teaching abilities.',
      linkName: '',
      linkUrl: '',
      isDownload: false
    },
    {
      title: 'Game Development Environment Setup',
      year: '2025',
      description: 'Prepared development environments for game creation using Unreal Engine (for 3D games) and Ren\'Py (for visual novels). Explored engine features, set up projects, and gained foundational knowledge in game design principles. This initiative reflects my interest in expanding into interactive media and creative programming.',
      linkName: '',
      linkUrl: '',
      isDownload: false
    }
  ];
}