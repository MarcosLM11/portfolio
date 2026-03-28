import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface GuestEntry {
  name: string;
  letter: string;
  bg: string;
  date: string;
  ago: string;
  message: string;
}

@Component({
  selector: 'app-guestbook-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './guestbook.html',
  styleUrl: './guestbook.css',
})
export class GuestbookPageComponent {
  readonly entries: GuestEntry[] = [];
}
