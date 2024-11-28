import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { CvComponent } from './add-cv/cv/cv.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { CvCardComponent } from './cv-card/cv-card.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MasterDetailsCvComponent } from './master-details-cv/master-details-cv.component';
import { Route, Router, RouterModule } from '@angular/router';
import { EmbaucheComponent } from './embauche/embauche.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCvComponent } from './add-cv/add-cv.component';
import { DefaultImagePipe } from './pipes/default-image.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CvResolver } from './cv.resolver';


const routes: Route[] = [
  {
    path: "",
    component: CvComponent,
  },
  {
    path: "list", component: MasterDetailsCvComponent,
    children: [
      { path: ":id", component: DetailsCvComponent, resolve: { cv: CvResolver } }
    ]
  },
  { path: "add", component: AddCvComponent, canActivate: [AuthGuard] },
  { path: ":id", component: DetailsCvComponent },
 
]
@NgModule({
  declarations: [CvComponent,
    ListComponent,
    ItemComponent,
    DetailsCvComponent,
    CvCardComponent,
    AutocompleteComponent,
    MasterDetailsCvComponent,
    EmbaucheComponent,
    AddCvComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DefaultImagePipe,
    RouterModule.forChild(routes),
  ]
})
export class CvTechModule { }
