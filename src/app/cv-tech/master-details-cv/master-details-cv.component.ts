import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';

@Component({
  selector: 'app-master-details-cv',
  templateUrl: './master-details-cv.component.html',
  styleUrl: './master-details-cv.component.css'
})
export class MasterDetailsCvComponent {

  cvs$: Observable<Cv[]>;
  selectedCv$: Observable<Cv>;
  constructor(private cvService: CvService, private router: Router,activatedRoute: ActivatedRoute) {
    this.selectedCv$ = this.cvService.getCvs();
    this.cvs$ = this.cvService.getAllCvs();
    this.selectedCv$.subscribe(cv => {
      if (this.router.url.includes('cv/list')) {
      this.router.navigate(['cv/list', cv.id]);
      }
    });
  }
}
