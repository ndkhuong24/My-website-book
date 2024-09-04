import { Routes } from '@angular/router';
import { AuthorComponent } from './component/author/author.component';
import { CategoryComponent } from './component/category/category.component';
import { TagsComponent } from './component/tags/tags.component';
import { LanguagesComponent } from './component/languages/languages.component';
import { ArtistsComponent } from './component/artists/artists.component';
import { CharactersComponent } from './component/characters/characters.component';
import { GroupsComponent } from './component/groups/groups.component';
import { ParodiesComponent } from './component/parodies/parodies.component';

export const routes: Routes = [
    { path: 'api/author', component: AuthorComponent },
    { path: 'api/category', component: CategoryComponent },
    { path: 'api/tags', component: TagsComponent },
    { path: 'api/languages', component: LanguagesComponent },
    { path: 'api/artists', component: ArtistsComponent },
    { path: 'api/parodies', component: ParodiesComponent },
    { path: 'api/characters', component: CharactersComponent },
    { path: 'api/groups', component: GroupsComponent },
];
