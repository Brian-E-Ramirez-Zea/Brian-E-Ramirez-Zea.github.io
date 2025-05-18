// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ExperienceComponent } from './experience/experience.component';

export const routes: Routes = [
  { path: 'experience', component: ExperienceComponent },
  { path: '', redirectTo: '/experience', pathMatch: 'full' }
];