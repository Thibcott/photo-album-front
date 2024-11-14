import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service'; // Service pour gérer les albums
import { PhotoService } from '../photo.service'; // Service pour gérer les photos
import { DomSanitizer } from '@angular/platform-browser'; // Importer DomSanitizer

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {
  album = {
    name: '',
    photos: []  // Assurer que 'photos' est un tableau vide dès le départ
  };
  currentPhoto = {
    image: null,
    comment: ''
  };

  constructor(
    private albumService: AlbumService,
    private photoService: PhotoService,
    private router: Router,
    private sanitizer: DomSanitizer // Injecter DomSanitizer
  ) {}

  ngOnInit(): void {
    // Vérification d'initialisation de photos au cas où
    if (!Array.isArray(this.album.photos)) {
      this.album.photos = [];
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.currentPhoto.image = file;
    }
  }

  addPhoto(): void {
    if (this.currentPhoto.image && this.currentPhoto.comment) {
      // Assurer que 'photos' est un tableau avant d'ajouter une photo
      if (!Array.isArray(this.album.photos)) {
        this.album.photos = []; // Réinitialiser en tableau vide si nécessaire
      }

      // Ajouter la photo à l'album en mémoire avec une URL sécurisée
      const newPhoto = {
        imageUrl: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.currentPhoto.image)), // Sécuriser l'URL blob
        comment: this.currentPhoto.comment
      };
      this.album.photos.push(newPhoto);

      // Réinitialiser le formulaire pour la prochaine photo
      this.currentPhoto = { image: null, comment: '' };
    }
  }

  onSubmit(): void {
  // Vérifie si l'album a des photos
  if (!this.album.photos || this.album.photos.length === 0) {
    console.error('Aucune photo ajoutée');
    alert('Veuillez ajouter au moins une photo');
    return;
  }
    // Créer un FormData pour inclure les fichiers
    const formData = new FormData();
    formData.append('name', this.album.name);
  
    // Ajouter les fichiers photo au FormData
    this.album.photos.forEach(photo => {
      if (photo.imageUrl instanceof File) {
        formData.append('photos', photo.imageUrl, photo.imageUrl.name); // Ajouter le fichier réel
      }
    });
  
    this.albumService.createAlbum(this.album).subscribe(
      response => {
        console.log('Album créé avec succès:', response);
        this.router.navigate([`/album/${response.id}`]);
      },
      error => {
        console.error('Erreur lors de la création de l\'album:', error);
        alert('Erreur lors de la création de l\'album');
      }
    );
  }
  
}
