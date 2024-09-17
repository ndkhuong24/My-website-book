import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ComicService } from '../../../service/comic.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TagsService } from '../../../service/tags.service';
import { ArtistsService } from '../../../service/artists.service';
import { LanguagesService } from '../../../service/languages.service';
import { forkJoin } from 'rxjs';
import { ParodiesService } from '../../../service/parodies.service';
import { CharactersService } from '../../../service/characters.service';
import { GroupsService } from '../../../service/groups.service';
import { CategoryService } from '../../../service/category.service';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Thêm dòng này
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-add-comic',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    AgGridModule,
    // MatDialogModule,
  ],
  templateUrl: './add-comic.component.html',
  styleUrl: './add-comic.component.scss'
})
export class AddComicComponent {
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  headerHeight: number = 38;
  rowHeight: number = 100

  imageFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;

  status: boolean = true;

  comicName: string = '';

  tagsActive: any[] = [];
  artistsActive: any[] = [];
  languagesActive: any[] = [];
  parodiesActive: any[] = [];
  charactersActive: any[] = [];
  groupsActive: any[] = [];
  categoryActive: any[] = [];

  selectedCategories: any[] = [];
  selectedLanguages: any[] = [];
  selectedArtist: number | null = null;
  selectedGroup: number | null = null;
  selectedTags: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddComicComponent>,
    private toastr: ToastrService,
    private comicService: ComicService,
    private tagsService: TagsService,
    private artistsService: ArtistsService,
    private languagesService: LanguagesService,
    private parodiesService: ParodiesService,
    private charactersService: CharactersService,
    private groupsService: GroupsService,
    private categoryService: CategoryService,
  ) {
    forkJoin({
      tags: this.tagsService.getAllTags(),
      artists: this.artistsService.getAllArtists(),
      languages: this.languagesService.getAllLanguages(),
      parodies: this.parodiesService.getAllParodies(),
      characters: this.charactersService.getAllCharacters(),
      groups: this.groupsService.getAllGroups(),
      categories: this.categoryService.getAllCategory(),
    }).subscribe((results: any) => {
      this.tagsActive = results.tags.filter((tag: any) => tag.status === 1);
      this.artistsActive = results.artists.filter((artist: any) => artist.status === 1);
      this.languagesActive = results.languages.filter((language: any) => language.status === 1);
      this.parodiesActive = results.parodies.filter((parodie: any) => parodie.status === 1);
      this.charactersActive = results.characters.filter((character: any) => character.status === 1);
      this.groupsActive = results.groups.filter((group: any) => group.status === 1);
      this.categoryActive = results.categories.filter((category: any) => category.status === 1);
    });
  }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCategoryChange(category: any, isChecked: boolean) {
    if (isChecked) {
      this.selectedCategories = [category.id];

      this.categoryActive.forEach((cat: any) => {
        cat.selected = (cat.id === category.id);
      });
    } else {
      this.selectedCategories = [];
      category.selected = false;
    }
  }

  onLanguageChange(language: any, isChecked: boolean) {
    if (isChecked) {
      this.selectedLanguages = [language.id];

      this.languagesActive.forEach((lang: any) => {
        lang.selected = (lang.id === language.id);
      });
    } else {
      this.selectedLanguages = [];
      language.selected = false;
    }
  }

  onChangeArtist(selectedId: number | null) {
    this.selectedArtist = selectedId;

    this.artistsActive.forEach((artist: any) => {
      artist.selected = (artist.id === selectedId);
    });
  }

  onChangeGroup(selectedId: number | null) {
    this.selectedGroup = selectedId;

    this.groupsActive.forEach((group: any) => {
      group.selected = (group.id === selectedId);
    });
  }

  onChangeTags(selectedId: number | null) {
    this.selectedTags = selectedId;

    this.tagsActive.forEach((tag: any) => {
      tag.selected = (tag.id === selectedId);
    });
  }


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageSrc = e.target?.result ?? '';
      }
      reader.readAsDataURL(this.imageFile)
    }
  }
}
