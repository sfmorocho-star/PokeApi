import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonThumbnail, 
  IonLabel,
  IonSpinner
} from '@ionic/angular';
import { PokeService } from '../../services/poke/poke.service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonThumbnail, 
    IonLabel,
    IonSpinner
  ]
})
export class HomePage implements OnInit {
  pokemons: Pokemon[] = [];
  loading: boolean = true;

  constructor(
    private pokeService: PokeService,
    private cdr: ChangeDetectorRef // <-- Inyección para forzar el renderizado
  ) {}

  ngOnInit() {
    this.cargarPokemones();
  }

  ionViewWillEnter() {
    this.cargarPokemones();
  }

  cargarPokemones() {
    this.pokeService.getPokemons().subscribe({
      next: (data: Pokemon[]) => {
        console.log('Pokémones recibidos con éxito:', data);
        this.pokemons = data;
        this.loading = false;
        this.cdr.detectChanges(); // <-- Obliga a Angular a ocultar el spinner y pintar la lista
      },
      error: (err) => {
        console.error('Error al conectar con PokeAPI:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}