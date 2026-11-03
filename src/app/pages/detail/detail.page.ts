import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton,
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent,
  IonChip,
  IonLabel,
  IonSpinner,
  IonList,
  IonItem,
  IonNote
} from '@ionic/angular';
import { PokeService } from '../../services/poke/poke.service';
import { PokemonDetail } from '../../models/pokemon';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonBackButton,
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent,
    IonChip,
    IonLabel,
    IonSpinner,
    IonList,
    IonItem,
    IonNote
  ]
})
export class DetailPage implements OnInit {
  pokemon: PokemonDetail | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cargarDetalle(id);
      }
    });
  }

  cargarDetalle(id: string) {
    this.loading = true;
    this.pokeService.getPokemonDetail(id).subscribe({
      next: (data: PokemonDetail) => {
        this.pokemon = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar detalle:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}