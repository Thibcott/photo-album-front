import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importation du Router pour la navigation

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  albums: any[] = [];  // Déclaration de la propriété albums

  constructor(private router: Router) {}

  navigateToCreateAlbum(): void {
    this.router.navigate(['/create-album']); // Méthode de navigation vers la page de création d'album
  }
}
