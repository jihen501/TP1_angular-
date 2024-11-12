import { Component } from '@angular/core';
import { RainbowTextDirective } from '../directives/rainbowText/rainbow-text.directive';

@Component({
  selector: 'app-rainbow-text-page',
  standalone: true,
  imports: [RainbowTextDirective],
  templateUrl: './rainbow-text-page.component.html',
  styleUrl: './rainbow-text-page.component.css'
})
export class RainbowTextPageComponent {

}
