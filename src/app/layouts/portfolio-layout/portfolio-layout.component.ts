import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from '../../shared/components/chatbot/chatbot.component';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-portfolio-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ChatbotComponent],
  templateUrl: './portfolio-layout.component.html',
  styleUrl: './portfolio-layout.component.css'
})
export class PortfolioLayoutComponent {
  constructor(public themeService: ThemeService) {}
}
