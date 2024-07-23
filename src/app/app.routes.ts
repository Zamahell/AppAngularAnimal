import { RouterModule, Routes } from '@angular/router';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { RegisterAnimalComponent } from './register-animal/register-animal.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: '', component: AnimalListComponent},
    {path: 'animal/registro', component: RegisterAnimalComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }