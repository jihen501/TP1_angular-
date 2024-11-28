import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CvService } from './services/cv.service';
import { Cv } from './model/cv';

@Injectable({
    providedIn: 'root'
})
export class CvResolver implements Resolve<Cv | null> {
    constructor(private cvService: CvService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Cv | null> {
        const id = +route.params['id'];
        return this.cvService.getCvById(id).pipe(
            catchError((error) => {
                console.error('Erreur lors de la récupération du CV', error);
                return of(null);
            })
        );
    }
}
