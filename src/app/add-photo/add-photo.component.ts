import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  albumId: string | undefined;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupère l'ID de l'album depuis les paramètres de la route
    this.albumId = this.route.snapshot.paramMap.get('id')!;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  addPhoto(): void {
    const formData = new FormData();
    formData.append('photo', this.selectedFile!, this.selectedFile!.name);

    // Envoie la photo à l'API (ajout à l'album)
    this.http
      .post(`http://localhost:3000/albums/${this.albumId}/photos`, formData)
      .subscribe(
        () => {
          console.log('Photo ajoutée avec succès');
          this.router.navigate([`/album/${this.albumId}`]); // Redirige vers l'album
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la photo', error);
        }
      );
  }
}
