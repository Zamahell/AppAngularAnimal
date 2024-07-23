import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AnimalService } from '../../../animal.service';
import { ToastrService } from 'ngx-toastr';
import { AnimalInterface } from '../../interface/animal-interface';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioComponent implements OnInit { 
  animal: AnimalInterface = { name: '', adopted: false }; 

  constructor(private animalService: AnimalService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  registerAnimal(): void {
    console.log('Datos del animal antes de enviar:', this.animal);

    if (!this.animal.name) {
      this.showMissingNameToast();
      return;
    }

    this.animalService.createAnimal(this.animal).pipe(
      tap(() => {
        this.showSuccesToast();
        this.animal = { name: '', adopted: false };
         
      }),
      catchError(error => {
        console.error('Error al registrar a la bestia', error);
        this.showFailedToast();
        return of(null);
      })
    ).subscribe();
  }

  showFailedToast() {
    this.toastr.error('Error al registrar el animal', 'Registro fallido');
  }

  showMissingNameToast() {
    this.toastr.error('El nombre del animal es requerido', 'Registro fallido');
  }

  showSuccesToast() {
    this.toastr.success(`El animal ${this.animal.name} ha sido registrado`, 'Registro exitoso');
  }
}
