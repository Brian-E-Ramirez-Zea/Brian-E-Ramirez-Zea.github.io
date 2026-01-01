import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light');
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  setTheme(theme: string) {
    // 1. Update data-bs-theme attribute
    document.documentElement.setAttribute('data-bs-theme', theme);

    // 2. Swap the CSS file (Minty for Light, Quartz for Dark)
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
    if (themeLink) {
      const cssFile = theme === 'dark' ? 'quartz.css' : 'minty.css';
      themeLink.href = `assets/themes/${cssFile}`;
    }

    localStorage.setItem('theme', theme);
    this.themeSubject.next(theme);
  }

  toggleTheme() {
    const current = this.themeSubject.value;
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }
}
