import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Interface pour la réponse de l'API
export interface AlbumResponse {
  id: number;
  name: string;
  photos: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'http://localhost:3000/api/albums'; // L'URL de ton API

  constructor(private http: HttpClient) {}

  createAlbum(album: any): Observable<AlbumResponse> {
    const formData = new FormData();
    formData.append('name', album.name);
  
    album.photos.forEach((photo: any, index: number) => {
      if (photo.image) {
        formData.append(`image_${index}`, photo.image);  // Utilisation de l'index pour chaque image
      } else {
        console.error(`Photo ${index} manquante ou invalide`);
      }
      
      if (photo.comment) {
        formData.append(`comment_${index}`, photo.comment);  // Ajout des commentaires
      } else {
        console.error(`Commentaire pour la photo ${index} manquant`);
      }
    });
  
    // Envoie des données à l'API
    return this.http.post<AlbumResponse>(this.apiUrl, formData).pipe(
      tap(response => {
        console.log('Réponse de l\'API:', response);
      }),
      catchError(error => {
        console.error('Erreur lors de l\'envoi:', error);
        return throwError(error);
      })
    );
  }
  
  
}
