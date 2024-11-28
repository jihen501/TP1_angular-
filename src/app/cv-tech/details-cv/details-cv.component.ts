import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  cv$!: Observable<Cv | null>;
  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.cv$ = this.activatedRoute.data.pipe(
      map(data => data['cv'])
    );
  }
  
 /*
  ngOnInit() {
    
    this.cv$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        const id = +params['id']; // Récupération de l'ID
        return this.cvService.getCvById(id).pipe(
          catchError(error => {
            // Redirige en cas d'erreur
            this.router.navigate(['cv/list']);
            return of(null); // Retourne un Observable avec `null` en cas d'erreur
          })
        );
      })
    );
  }*/
  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).pipe(
      catchError(() => {
        this.toastr.error(`Problème avec le serveur, veuillez contacter l'admin`);
        return of(null);
      })
    ).subscribe(() => {
      this.toastr.success(`${cv.name} supprimé avec succès`);
      this.router.navigate([APP_ROUTES.cv]);
    });
  }
}