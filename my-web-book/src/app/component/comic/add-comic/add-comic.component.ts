import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonCellRendererComponent } from './button-cell-renderer.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips'; // Import MatChipsModule

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
    MatAutocompleteModule,
    MatChipsModule
  ],
  templateUrl: './add-comic.component.html',
  styleUrl: './add-comic.component.scss'
})
export class AddComicComponent {
  rowData: any[] = [];
  columnDefs: ColDef[] = [];

  rowData1: any[] = [];
  columnDefs1: ColDef[] = [];

  rowData2: any[] = [];
  columnDefs2: ColDef[] = [];

  headerHeight: number = 38;
  rowHeight: number = 50

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
  selectedTags: any[] = [];
  selectedParodies: any[] = [];
  selectedCharacters: any[] = [];

  tagSearch: string = '';
  filteredTags: any[] = [];

  parodySearch: string = '';
  filteredParodies: any[] = [];

  characterSearch: string = '';
  filteredCharacters: any[] = [];

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

      this.filteredTags = this.tagsActive;
      this.filteredParodies = this.parodiesActive;
      this.filteredCharacters = this.charactersActive;
    });
  }

  filterTags() {
    const searchTerm = this.tagSearch.toLowerCase();
    this.filteredTags = this.tagsActive.filter(tag => tag.name.toLowerCase().includes(searchTerm));
  }

  filterParodies() {
    const searchTerm = this.parodySearch.toLowerCase();
    this.filteredParodies = this.parodiesActive.filter(parody => parody.name.toLowerCase().includes(searchTerm));
  }

  filterCharacters() {
    const searchTerm = this.characterSearch.toLowerCase();
    this.filteredCharacters = this.charactersActive.filter(character => character.name.toLowerCase().includes(searchTerm));
  }

  displayTagName(tag: any): string {
    return tag ? tag.name : '';
  }

  displayParodyName(parody: any): string {
    return parody ? parody.name : '';
  }

  displayCharacterName(character: any): string {
    return character ? character.name : '';
  }

  onTagSelected(event: any) {
    const selectedTag = event.option.value;

    // Kiểm tra xem tag đã tồn tại trong danh sách selectedTags chưa
    if (selectedTag && !this.selectedTags.includes(selectedTag.id)) {
      this.selectedTags.push(selectedTag.id);
      this.onChangeTags(this.selectedTags);
    }
  }

  onParodySelected(event: any) {
    const selectedParody = event.option.value;

    // Kiểm tra xem parody đã tồn tại trong danh sách selectedParodies chưa
    if (selectedParody && !this.selectedParodies.includes(selectedParody.id)) {
      this.selectedParodies.push(selectedParody.id);
      this.onChangeParodies(this.selectedParodies);
    }
  }

  onCharacterSelected(event: any) {
    const selectedCharacter = event.option.value;

    if (selectedCharacter && !this.selectedCharacters.includes(selectedCharacter.id)) {
      this.selectedCharacters.push(selectedCharacter.id);
      this.onChangeCharacters(this.selectedCharacters);
    }
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

  onChangeTags(selectedIds: string[]) {
    this.selectedTags = selectedIds;

    this.tagsActive.forEach((tag: any) => {
      tag.selected = false;
    });

    this.rowData = selectedIds.map(selectedId => {
      const selectedTag = this.tagsActive.find(tag => tag.id === selectedId);
      if (selectedTag) {
        selectedTag.selected = true;
        return selectedTag;
      }
      return null;
    }).filter(tag => tag !== null);

    this.columnDefs = [
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      {
        headerName: 'Chức năng',
        field: 'actions',
        cellRenderer: ButtonCellRendererComponent,
        cellRendererParams: {
          onClick: this.onButtonClickTags.bind(this)
        },
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
    ];
  }

  onChangeParodies(selectedIds: any[]) {
    this.selectedParodies = selectedIds;

    this.parodiesActive.forEach((parody: any) => {
      parody.selected = false;
    });

    this.rowData1 = selectedIds.map(selectedId => {
      const selectedParody = this.parodiesActive.find(parody => parody.id === selectedId);
      if (selectedParody) {
        selectedParody.selected = true;
        return selectedParody;
      }
      return null;
    }).filter(parody => parody !== null);

    this.columnDefs1 = [
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      {
        headerName: 'Chức năng',
        field: 'actions',
        cellRenderer: ButtonCellRendererComponent,
        cellRendererParams: {
          onClick: this.onButtonClickParodies.bind(this)
        },
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
    ];
  }

  onChangeCharacters(selectedIds: any[]) {
    this.selectedCharacters = selectedIds;

    this.charactersActive.forEach((character: any) => {
      character.selected = false;
    });

    this.rowData2 = selectedIds.map(selectedId => {
      const selectedCharacter = this.charactersActive.find(character => character.id === selectedId);
      if (selectedCharacter) {
        selectedCharacter.selected = true;
        return selectedCharacter;
      }
      return null;
    }).filter(character => character !== null);

    this.columnDefs2 = [
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      {
        headerName: 'Chức năng',
        field: 'actions',
        cellRenderer: ButtonCellRendererComponent,
        cellRendererParams: {
          onClick: this.onButtonClickCharacters.bind(this)
        },
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
    ];
  }

  onButtonClickTags(rowData: any) {
    this.selectedTags = this.selectedTags.filter(tagId => tagId !== rowData.id);

    this.tagsActive.forEach((tag: any) => {
      if (tag.id === rowData.id) {
        tag.selected = false;
      }
    });

    this.rowData = this.rowData.filter(tag => tag.id !== rowData.id);
  }

  onButtonClickCharacters(rowData2: any) {
    // Xóa character khỏi danh sách selectedCharacters
    this.selectedCharacters = this.selectedCharacters.filter(characterID => characterID !== rowData2.id);

    // Đặt lại trạng thái selected của character trong danh sách charactersActive
    this.charactersActive.forEach((character: any) => {
      if (character.id === rowData2.id) {
        character.selected = false;
      }
    });

    // Cập nhật lại rowData2 để loại bỏ character đã bị xóa
    this.rowData2 = this.rowData2.filter(character => character.id !== rowData2.id);
  }


  onButtonClickParodies(rowData1: any) {
    this.selectedParodies = this.selectedParodies.filter(parodyID => parodyID !== rowData1.id);

    // Đặt lại trạng thái selected của parody trong danh sách parodiesActive
    this.parodiesActive.forEach((parody: any) => {
      if (parody.id === rowData1.id) {
        parody.selected = false;
      }
    });

    // Cập nhật lại rowData1 để loại bỏ parody đã bị xóa
    this.rowData1 = this.rowData1.filter(parody => parody.id !== rowData1.id);
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

  addComic() {
    
  }
}