import { Component, HostListener, effect, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BookCallService } from '../../services/book-call.service';

@Component({
  selector: 'app-book-call',
  standalone: true,
  imports: [],
  templateUrl: './book-call.html',
  styleUrl: './book-call.css',
})
export class BookCallComponent {
  private platformId = inject(PLATFORM_ID);
  readonly svc = inject(BookCallService);

  readonly email = 'tu@email.com';
  readonly githubUrl = 'https://github.com/tu-usuario';
  readonly linkedinUrl = 'https://linkedin.com/in/tu-usuario';

  emailCopied = signal(false);

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      document.body.style.overflow = this.svc.isOpen() ? 'hidden' : '';
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.svc.close();
  }

  openGmail(): void {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${this.email}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  copyEmail(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.email).then(() => {
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 2000);
    });
  }
}
