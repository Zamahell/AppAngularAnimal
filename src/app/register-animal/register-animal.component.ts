import { Component } from '@angular/core';
import { AnimalService } from '../animal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-animal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-animal.component.html',
  styleUrl: './register-animal.component.css'
})
export class RegisterAnimalComponent {

    animal: any = {};
    constructor(private animalService: AnimalService){}

    registerAnimal():void{
      this.animalService.createAnimal(this.animal).subscribe(() => {
        alert('Mascota registrada con exitos');
      }, error => {
        console.log('Error al registrar a la bestia', error)
      })
    }
}
