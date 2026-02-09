import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-check-mail', // Neuer Selector
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './check-mail.html', // Neue Dateinamen verknüpfen
  styleUrl: './check-mail.scss'
})
export class CheckMailComponent { // Neuer Klassenname
}
