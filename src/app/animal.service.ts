import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AnimalInterface } from './animal-list/interface/animal-interface';

interface PaginationDto {
  page?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  // MANEJAR URL CON ENV
  private baseUrl = 'http://localhost:3001/api/animal';

  // Añadir BehaviorSubject para la actualización de la lista
  private animalListSubject = new BehaviorSubject<AnimalInterface | null>(null);
  animalList$ = this.animalListSubject.asObservable();

  constructor(private http: HttpClient) { }

  findAllNotAdopted(paginationDto: PaginationDto): Observable<any> {
    let params = new HttpParams();
    if (paginationDto.page) {
      params = params.set('page', paginationDto.page.toString());
    }

    if (paginationDto.limit) {
      params = params.set('limit', paginationDto.limit?.toString());
    }

    return this.http.get<any>(`${this.baseUrl}/notAdopted`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  createAnimal(animal: AnimalInterface): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, animal).pipe(
      // Enlazar registro con el BehaviorSubject, para actualizar la lista al registrar
      tap(() => this.updateAnimalList(animal)),
      catchError(this.handleError)
    );
  }

  editAnimal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateAnimalList(animal: AnimalInterface) {
    this.animalListSubject.next(animal);
  }

  handleError(error: HttpErrorResponse) {
    console.log('Detalle del error', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrio un error:', error.error.message);
    } else {
      console.log(`Error en el servidor: ${error.status}, ` + `mensaje: ${error.message}`);
    }
    return throwError(() => 'Algo salio mal; por favor, intente nuevamente');
  }
}
