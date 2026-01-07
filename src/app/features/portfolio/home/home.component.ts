import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('resumeContainer', { static: false }) resumeContainer!: ElementRef;

  ngAfterViewInit() {
    if (!this.resumeContainer) {
      console.error('Resume container not initialized');
    }
  }

  downloadPDF() {
    const element = this.resumeContainer?.nativeElement;

    if (!element) {
      console.error('Resume content not found used viewChild');
      alert('Error: Resume content not found. Please try again.');
      return;
    }

    const opt = {
      margin: 10,
      filename: 'Brian_Ramirez_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().catch((err: any) => {
      console.error('PDF generation failed:', err);
      alert('An error occurred while generating the PDF. Please try again.');
    });
  }
}