import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from "./components/formulario/formulario.component";
import { NoadoptedComponent } from "./components/noadopted/noadopted.component";

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioComponent, NoadoptedComponent],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent{
  constructor(){}
}
