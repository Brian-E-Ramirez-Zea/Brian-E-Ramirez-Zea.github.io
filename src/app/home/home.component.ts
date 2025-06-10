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
    console.log('ngAfterViewInit: resumeContainer:', this.resumeContainer);
    if (!this.resumeContainer) {
      console.error('ViewChild resumeContainer is undefined in ngAfterViewInit');
      const fallbackElement = document.querySelector('#resumeContainer');
      console.log('Fallback: document.querySelector("#resumeContainer"):', fallbackElement);
    } else {
      console.log('resumeContainer element:', this.resumeContainer.nativeElement);
    }
  }

  downloadPDF() {
    console.log('downloadPDF called');
    let element: HTMLElement | null = null;
    
    if (this.resumeContainer && this.resumeContainer.nativeElement) {
      element = this.resumeContainer.nativeElement;
    } else {
      console.warn('ViewChild resumeContainer is undefined, falling back to document.querySelector');
      element = document.querySelector('#resumeContainer');
    }

    if (!element) {
      console.error('Resume container not found in downloadPDF');
      alert('Error: Resume content not found. Please try again.');
      return;
    }

    console.log('Capturing element:', element);

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