import { Routes } from '@angular/router';
import { AuthorComponent } from './component/author/author.component';
import { CategoryComponent } from './component/category/category.component';
import { TagsComponent } from './component/tags/tags.component';
import { LanguagesComponent } from './component/languages/languages.component';

export const routes: Routes = [
    { path: 'api/author', component: AuthorComponent },
    { path: 'api/category', component: CategoryComponent },
    { path: 'api/tags', component: TagsComponent },
    { path: 'api/languages', component: LanguagesComponent },
];
