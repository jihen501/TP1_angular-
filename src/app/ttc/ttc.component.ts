import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css'
})
export class TTCComponent {

  prixHT = signal(0);
  quantite = signal(1);
  tva = signal(18);

  prixUnitaireTTC = computed(() => {
    return this.prixHT() * (1 + this.tva() / 100);
  });

  calculRemise = computed(() => {
    if (this.quantite() > 15) {
      return 0.3; 
    } else if (this.quantite() >= 10) {
      return 0.2; 
    }
    return 0;
  });

  prixTotalTTC = computed(() => {
    const prixTotal = this.prixUnitaireTTC() * this.quantite();
    return prixTotal * (1 - this.calculRemise());
  });

  montantRemise = computed(() => {
    return this.prixUnitaireTTC() * this.quantite() * this.calculRemise();
  });

  setPrixHT(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.prixHT.set(Number(inputValue));
  }

  setQuantite(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.quantite.set(Number(inputValue));
  }

  setTva(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.tva.set(Number(inputValue));
  }



}
