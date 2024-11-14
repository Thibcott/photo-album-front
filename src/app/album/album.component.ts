import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  albumId: string;
  album: any;
  photos: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.albumId = this.route.snapshot.paramMap.get('id')!;
    this.getAlbum();
    this.getPhotos();
  }

  getAlbum(): void {
    this.http
      .get(`http://localhost:3000/albums/${this.albumId}`)
      .subscribe((album: any) => {
        this.album = album;
      });
  }

  getPhotos(): void {
    this.http
      .get(`http://localhost:3000/albums/${this.albumId}/photos`)
      .subscribe((photos: any[]) => {
        this.photos = photos;
      });
  }
}
