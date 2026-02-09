import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // WICHTIG: Importieren

@Component({
  selector: 'app-success',
  standalone: true, // Sicherheitshalber explizit machen
  imports: [CommonModule, RouterLink], // RouterLink hier einfügen, sonst geht der Button nicht!
  templateUrl: './success.html',
  styleUrl: './success.scss',
})
export class SuccessComponent { // Name auf "SuccessComponent" ändern
}
