import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Define the structure for a single message
interface Message {
  type: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true, // Marking the component as standalone
  imports: [CommonModule, FormsModule], // Importing necessary modules for standalone components
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewInit {
  isOpen = false;
  userInput = '';
  messages: Message[] = [];
  private http = inject(HttpClient);
  
  // ViewChild to get access to the chat container element for scrolling
  @ViewChild('chatBody') private chatBodyContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  // Lifecycle hook that runs after the component's view has been initialized
  ngAfterViewInit() {
    // Display the initial greeting message from the bot
    this.addBotMessage("Hello! I'm an AI assistant. Ask me about Brian's skills and experience.");
  }

  // Toggles the visibility of the chat window
  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  // Handles sending a message
  sendMessage(): void {
    const userMessage = this.userInput.trim();
    if (!userMessage) return; // Don't send empty messages

    this.addUserMessage(userMessage);
    this.userInput = ''; // Clear the input field

    // Call the Netlify function backend
    this.http.post<{ reply: string }>('/.netlify/functions/chat', { message: userMessage })
      .subscribe({
        next: (response) => {
          this.addBotMessage(response.reply);
        },
        error: (error) => {
          console.error('Error calling chat function:', error);
          this.addBotMessage('Sorry, I seem to be having trouble connecting. Please try again later.');
        }
      });
  }

  // Adds a user message to the messages array
  private addUserMessage(text: string): void {
    this.messages.push({ type: 'user', text });
    this.scrollToBottom();
  }

  // Adds a bot message to the messages array
  private addBotMessage(text: string): void {
    this.messages.push({ type: 'bot', text });
    this.scrollToBottom();
  }

  // Scrolls the chat body to the bottom to show the latest message
  private scrollToBottom(): void {
    // We use detectChanges and a try-catch block to ensure scrolling happens reliably
    this.cdr.detectChanges();
    try {
      this.chatBodyContainer.nativeElement.scrollTop = this.chatBodyContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }
}
