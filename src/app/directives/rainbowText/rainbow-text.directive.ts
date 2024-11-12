import { Directive,HostBinding, HostListener } from '@angular/core';

@Directive({
  selector:'input[appRainbowText], textarea[appRainbowText]',
  standalone: true
})
export class RainbowTextDirective {

  private colors: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  @HostBinding('style.color') color: string = 'black';  
  @HostBinding('style.borderColor') borderColor: string = 'black'; 
  

  @HostListener('keyup')
  onKeyUp() {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    const randomColor2= this.colors[Math.floor(Math.random() * this.colors.length)];

    this.color = randomColor;
    this.borderColor = randomColor2;
  }
}
