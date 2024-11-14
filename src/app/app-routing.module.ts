import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { AlbumComponent } from './album/album.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-album', component: CreateAlbumComponent },
  { path: 'album/:id', component: AlbumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configure les routes ici
  exports: [RouterModule] // Exporte le RouterModule pour être utilisé dans d'autres modules
})
export class AppRoutingModule {}
