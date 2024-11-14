import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';  // Import de FormsModule

// Importer les modules de PrimeNG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { CreateAlbumComponent } from './create-album/create-album.component';  // Assure-toi d'importer CreateAlbumComponent ici

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddPhotoComponent,
    CreateAlbumComponent  // Déclare CreateAlbumComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,  // Ajouter FormsModule ici pour pouvoir utiliser ngModel
    ButtonModule,
    CardModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
