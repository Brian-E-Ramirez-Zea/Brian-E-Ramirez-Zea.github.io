// src/app/app.component.ts
import { Component } from '@angular/core';
import { ExperienceComponent } from './experience/experience.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ExperienceComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-resume-app';
}