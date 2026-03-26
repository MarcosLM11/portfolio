import { Component, AfterViewInit, ElementRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  host: {
    class: 'section-reveal',
    '[class.visible]': 'visible()',
  },
})
export class ContactComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private host = inject(ElementRef);

  visible = signal(false);
  submitted = signal(false);

  form: ContactForm = { name: '', email: '', message: '' };

  readonly contactLinks = [
    { label: 'Email', value: 'hello@marcos.dev', href: 'mailto:hello@marcos.dev' },
    { label: 'GitHub', value: 'github.com/marcos', href: 'https://github.com' },
    { label: 'LinkedIn', value: 'linkedin.com/in/marcos', href: 'https://linkedin.com' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(this.host.nativeElement);
  }

  onSubmit(): void {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    // Placeholder: connect to a backend or form service here
    this.submitted.set(true);
    this.form = { name: '', email: '', message: '' };
  }
}
