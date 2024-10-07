import { Routes } from '@angular/router';
import { CategoryComponent } from './component/category/category.component';
import { TagsComponent } from './component/tags/tags.component';
import { LanguagesComponent } from './component/languages/languages.component';
import { ArtistsComponent } from './component/artists/artists.component';
import { CharactersComponent } from './component/characters/characters.component';
import { GroupsComponent } from './component/groups/groups.component';
import { ParodiesComponent } from './component/parodies/parodies.component';
import { ComicComponent } from './component/comic/comic.component';
import { HomeComponent } from './component/home/home.component';
import { DetailComponent } from './component/detail/detail.component';

export const routes: Routes = [
    { path: 'api/category', component: CategoryComponent },
    { path: 'api/tags', component: TagsComponent },
    { path: 'api/languages', component: LanguagesComponent },
    { path: 'api/artists', component: ArtistsComponent },
    { path: 'api/parodies', component: ParodiesComponent },
    { path: 'api/characters', component: CharactersComponent },
    { path: 'api/groups', component: GroupsComponent },
    { path: 'api/comic', component: ComicComponent },
    { path: '', component: HomeComponent },
    { path: 'gallery/:id', component: DetailComponent }
];
