import {
  Component,
  inject,
  signal,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../../services/chat.service';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements AfterViewChecked {
  private chatService = inject(ChatService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLElement>;

  messages = signal<Message[]>([]);
  inputValue = '';
  loading = signal(false);
  private shouldScroll = false;

  readonly suggestions = ['Work', 'About me', 'Skills', 'Contact'];

  send(text?: string): void {
    const content = (text ?? this.inputValue).trim();
    if (!content || this.loading()) return;

    this.messages.update((msgs) => [...msgs, { role: 'user', content }]);
    this.inputValue = '';
    this.loading.set(true);
    this.shouldScroll = true;

    const chatMessages: ChatMessage[] = this.messages().map((m) => ({
      role: m.role,
      content: m.content,
    }));

    this.chatService.send(chatMessages).subscribe({
      next: (res) => {
        this.messages.update((msgs) => [...msgs, { role: 'assistant', content: res.message }]);
        this.loading.set(false);
        this.shouldScroll = true;
      },
      error: () => {
        this.messages.update((msgs) => [
          ...msgs,
          {
            role: 'assistant',
            content: "Sorry, I couldn't process your request. Please try again.",
          },
        ]);
        this.loading.set(false);
        this.shouldScroll = true;
      },
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll && isPlatformBrowser(this.platformId)) {
      const container = this.messagesContainer?.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
      this.shouldScroll = false;
    }
  }
}
