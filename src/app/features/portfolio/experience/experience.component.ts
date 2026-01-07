import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experiences = [
    {
      role: 'Freelance & Family Business Support',
      duration: 'Ongoing',
      description: 'Digitized paper records into Excel/Word for family business, improving data organization and accessibility. Performed food service, deliveries, and household services including lawn care and cleaning. Also provided musical performances (guitar, violin, vocals) for income generation. Developed strong work ethic, communication, and adaptability skills.',
      skillsLabel: 'Skills:',
      skills: 'Data Management, Customer Service, Responsibility'
    },
    {
      role: 'Peer Mentor – Advanced Programming Course',
      duration: '2023-2024',
      description: 'Mentored junior students in C++ game development, focusing on debugging, algorithm optimization, and best practices. Collaborated on code reviews and version control using Git, enhancing team collaboration and code quality.',
      skillsLabel: 'Technologies:',
      skills: 'C++, Git'
    },
    {
      role: 'NES Game Developer',
      duration: '2024',
      description: 'Collaborated in a team to develop a custom NES game using 6502 Assembly. Handled low-level programming tasks including memory management, sprite rendering, and hardware I/O, contributing to engaging gameplay mechanics.',
      skillsLabel: 'Technologies:',
      skills: '6502 Assembly'
    }
  ];
}
