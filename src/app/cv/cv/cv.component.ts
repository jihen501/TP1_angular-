import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { catchError, map, Observable, of } from "rxjs";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  selectedCv$: Observable<Cv | null>;
  /*   selectedCv: Cv | null = null; */
  date = new Date();
  juniors$: Observable<Cv[]>;
  seniors$: Observable<Cv[]>;

  constructor(
    private cvService: CvService
  ) {
    this.selectedCv$ = this.cvService.getCvs();
    this.juniors$ = this.cvService.getJuniors();
    this.seniors$ = this.cvService.getSeniors();
  }

}
