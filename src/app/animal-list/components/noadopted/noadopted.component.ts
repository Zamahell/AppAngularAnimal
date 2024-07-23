import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimalService } from '../../../animal.service';
import { ToastrService } from 'ngx-toastr';
import { AnimalInterface } from '../../interface/animal-interface';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-noadopted',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './noadopted.component.html',
  styleUrls: ['./noadopted.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoadoptedComponent implements OnInit {
  animals: AnimalInterface[] = [];
  total: number = 0;
  page: number = 1;
  limit: number = 5;
  animal: AnimalInterface = { name: '', adopted: false };

  constructor(
    private animalService: AnimalService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAnimals();
    this.animalService.animalList$.subscribe(newAnimal => {
      if (newAnimal) {
        this.getAnimals();
      }
    });
  }

  getAnimals(): void {
    this.animalService.findAllNotAdopted({ page: this.page, limit: this.limit }).pipe(
      tap((response) => {
        this.animals = response.data;
        this.total = response.total;
        console.log('Datos de animales:', this.animals);
        console.log('Total de animales:', this.total);
        // Importante para actualizar la vista de forma correcta
        this.cdr.markForCheck();
      }),
      catchError((error) => {
        console.error('Error al obtener los animales', error);
        return of(null);
      })
    ).subscribe();
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.getAnimals();
    }
  }

  onLimitChange(event: any): void {
    const newLimit = Number(event.target.value);
    if (newLimit) {
      this.limit = newLimit;
      this.page = 1;
      this.getAnimals();
    }
  }

  editAnimal(id: number): void {
    this.animalService.editAnimal(id).pipe(
      tap(() => {
        this.getAnimals();
        this.showSuccessAdopt();
      }),
      catchError(error => {
        console.error('Error al adoptar al animal', error);
        return of(null);
      })
    ).subscribe();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  showSuccessAdopt(): void {
    this.toastr.success('El animal ha sido adoptado', 'Adopción exitosa');
  }
}
