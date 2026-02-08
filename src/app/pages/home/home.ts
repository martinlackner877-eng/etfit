import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero';
import { SpaceComponent } from '../../components/space/space';
import { MembershipComponent } from '../../components/membership/membership';
import { ManifestoComponent } from '../../components/manifesto/manifesto';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeroComponent, SpaceComponent, MembershipComponent, ManifestoComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomePageComponent {}
