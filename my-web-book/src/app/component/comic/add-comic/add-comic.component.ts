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
import {
  ColDef,
  RowSelectedEvent,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonCellRendererComponent } from './button-cell-renderer.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips'; // Import MatChipsModule
import { StatusCellRenderComponent } from '../comic-cell-render/status-cell-render.component';

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
    MatChipsModule,
  ],
  templateUrl: './add-comic.component.html',
  styleUrl: './add-comic.component.scss',
})
export class AddComicComponent {
  artistRowData: any[] = [];
  artistColumnDefs: ColDef[] = [];

  tagRowData: any[] = [];
  tagColumnDefs: ColDef[] = [];

  parodyRowData: any[] = [];
  parodyColumnDefs: ColDef[] = [];

  characterRowData: any[] = [];
  characterColumnDefs: ColDef[] = [];

  groupRowData: any[] = [];
  groupColumnDefs: ColDef[] = [];

  headerHeight: number = 50;
  rowHeight: number = 50;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 20, 50, 100];

  imageFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;

  status: boolean = true;

  comicName: string = '';
  artistSearchName: string = '';
  tagSearchName: string = '';
  parodySearchName: string = '';
  characterSearchName: string = '';
  groupSearchName: string = '';

  tagsActive: any[] = [];
  artistsActive: any[] = [];
  languagesActive: any[] = [];
  parodiesActive: any[] = [];
  charactersActive: any[] = [];
  groupsActive: any[] = [];
  categoryActive: any[] = [];

  selectedCategories: any[] = [];
  selectedLanguages: any[] = [];
  selectedArtists: any[] = [];
  selectedGroups: any[] = [];
  selectedTags: any[] = [];
  selectedParodies: any[] = [];
  selectedCharacters: any[] = [];

  tagSearch: string = '';
  filteredTags: any[] = [];

  parodySearch: string = '';
  filteredParodies: any[] = [];

  characterSearch: string = '';
  filteredCharacters: any[] = [];

  imagePreviews: string[] = [];

  imageFileDetail: File[] | [] | undefined;

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
    private categoryService: CategoryService
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
      this.artistsActive = results.artists.filter(
        (artist: any) => artist.status === 1
      );
      this.languagesActive = results.languages.filter(
        (language: any) => language.status === 1
      );
      this.parodiesActive = results.parodies.filter(
        (parodie: any) => parodie.status === 1
      );
      this.charactersActive = results.characters.filter(
        (character: any) => character.status === 1
      );
      this.groupsActive = results.groups.filter(
        (group: any) => group.status === 1
      );
      this.categoryActive = results.categories.filter(
        (category: any) => category.status === 1
      );

      this.artistRowData = this.artistsActive;
      this.artistColumnDefs = [
        {
          headerCheckboxSelection: true, // Hiển thị checkbox trên tiêu đề của cột này (chọn tất cả)
          checkboxSelection: true, // Hiển thị checkbox cho mỗi dòng
          width: 50, // Đặt chiều rộng cho cột checkbox
          resizable: false, // Không cho phép thay đổi kích thước cột
        },
        {
          headerName: 'Tên',
          field: 'name',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          flex: 1,
          resizable: false,
        },
        {
          headerName: 'Ngày tạo',
          field: 'created_at',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          valueFormatter: this.dateFormatter,
          flex: 1,
          resizable: false,
        },
        {
          headerName: 'Ngày cập nhật',
          field: 'updated_at',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          valueFormatter: this.dateFormatter,
          flex: 1,
          resizable: false,
        },
      ];

      this.tagRowData = this.tagsActive;
      this.tagColumnDefs = [
        {
          headerCheckboxSelection: true,
          checkboxSelection: true,
          width: 50,
          resizable: false,
        },
        {
          headerName: 'Tên',
          field: 'name',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          flex: 1,
          resizable: false,
        },
        {
          headerName: 'Ngày tạo',
          field: 'created_at',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          valueFormatter: this.dateFormatter,
          flex: 1,
          resizable: false,
        },
        {
          headerName: 'Ngày cập nhật',
          field: 'updated_at',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          valueFormatter: this.dateFormatter,
          flex: 1,
          resizable: false,
        },
      ];

      this.parodyRowData = this.parodiesActive;
      this.parodyColumnDefs = [
        {
          headerCheckboxSelection: true,
          checkboxSelection: true,
          width: 50,
          resizable: false,
        },
        {
          headerName: 'Tên',
          field: 'name',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          flex: 1,
          resizable: false,
        },
        {
          headerName: 'Ngày tạo',
          field: 'created_at',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          valueFormatter: this.dateFormatter,
          flex: 1,
          resizable: false,
        },
        {
          headerName: 'Ngày cập nhật',
          field: 'updated_at',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          valueFormatter: this.dateFormatter,
          flex: 1,
          resizable: false,
        },
      ];

      this.characterRowData = this.charactersActive;
      this.characterColumnDefs = [
        {
          headerCheckboxSelection: true,
          checkboxSelection: true,
          width: 50,
          resizable: false,
        },
        {
          headerName: 'Tên',
          field: 'name',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          flex: 1,
          resizable: false,
        },
        {
          headerName: 'Ngày tạo',
          field: 'created_at',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          valueFormatter: this.dateFormatter,
          flex: 1,
          resizable: false,
        },
        {
          headerName: 'Ngày cập nhật',
          field: 'updated_at',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          valueFormatter: this.dateFormatter,
          flex: 1,
          resizable: false,
        },
      ];

      this.groupRowData = this.groupsActive;
      this.groupColumnDefs = [
        {
          headerCheckboxSelection: true,
          checkboxSelection: true,
          width: 50,
          resizable: false,
        },
        {
          headerName: 'Tên',
          field: 'name',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          flex: 1,
          resizable: false,
        },
        {
          headerName: 'Ngày tạo',
          field: 'created_at',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          valueFormatter: this.dateFormatter,
          flex: 1,
          resizable: false,
        },
        {
          headerName: 'Ngày cập nhật',
          field: 'updated_at',
          sortable: true,
          filter: true,
          cellStyle: {
            'align-items': 'center',
            'justify-content': 'middle',
            display: 'flex',
          },
          valueFormatter: this.dateFormatter,
          flex: 1,
          resizable: false,
        },
      ];
    });
  }

  dateFormatter(params: { value: string | number | Date }) {
    const date = new Date(params.value);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  onSelectionArtistChanged(event: any) {
    const selectedRows = event.api.getSelectedNodes();
    this.selectedArtists = selectedRows.map(
      (node: { data: { id: any } }) => node.data.id
    );
  }

  onSelectionTagChanged(event: any): void {
    const selectedTagsCurrent = event.api.getSelectedNodes();
    this.selectedTags = selectedTagsCurrent.map(
      (node: { data: { id: any } }) => node.data.id
    );
  }

  onSelectionParodyChanged(event: any): void {
    const selectedParodiesCurrent = event.api.getSelectedNodes();
    this.selectedParodies = selectedParodiesCurrent.map(
      (node: { data: { id: any } }) => node.data.id
    );
  }

  onSelectionCharacterChanged(event: any): void {
    const selectedCharactersCurrent = event.api.getSelectedNodes();
    this.selectedCharacters = selectedCharactersCurrent.map((node: { data: { id: any } }) => node.data.id);
  }

  onSelectionGroupChanged(event: any): void {
    const selectedGroupsCurrent = event.api.getSelectedNodes();
    this.selectedGroups = selectedGroupsCurrent.map((node: { data: { id: any } }) => node.data.id);
  }

  onPageSizeChanged(newPageSize: number): void {
    this.paginationPageSize = newPageSize;
  }

  searchArtist() {
    if (
      this.artistSearchName.length === 0 &&
      this.artistSearchName.trim().length === 0
    ) {
      this.artistRowData = this.artistsActive;
    } else {
      this.artistsService
        .searchArtistByName(this.artistSearchName)
        .subscribe((response) => {
          if (
            response.status === 200 &&
            response.success === true &&
            response.message === 'Search Artist name successfully!'
          ) {
            this.artistRowData = response.data;
          }
        });
    }
  }

  searchTag() {
    if (
      this.tagSearchName.length === 0 &&
      this.tagSearchName.trim().length === 0
    ) {
      this.tagRowData = this.tagsActive;
    } else {
      this.tagsService
        .searchTagByName(this.tagSearchName)
        .subscribe((response) => {
          if (
            response.status === 200 &&
            response.success === true &&
            response.message === 'Search Tag name successfully!'
          ) {
            this.tagRowData = response.data;
          }
        });
    }
  }

  searchParody() {
    if (
      this.parodySearchName.length === 0 &&
      this.parodySearchName.trim().length === 0
    ) {
      this.parodyRowData = this.parodiesActive;
    } else {
      this.parodiesService
        .searchParodyByName(this.parodySearchName)
        .subscribe((response) => {
          if (
            response.status === 200 &&
            response.success === true &&
            response.message === 'Search Parody name successfully!'
          ) {
            this.parodyRowData = response.data;
          }
        });
    }
  }

  searchCharacter() {
    if (
      this.characterSearchName.length === 0 &&
      this.characterSearchName.trim().length === 0
    ) {
      this.characterRowData = this.charactersActive;
    } else {
      this.charactersService
        .searchCharacterByName(this.characterSearchName)
        .subscribe((response) => {
          if (
            response.status === 200 &&
            response.success === true &&
            response.message === 'Search Character name successfully!'
          ) {
            this.characterRowData = response.data;
          }
        });
    }
  }

  searchGroup() {
    if (
      this.groupSearchName.length === 0 &&
      this.groupSearchName.trim().length === 0
    ) {
      this.groupRowData = this.groupsActive;
    } else {
      this.groupsService
        .searchGroupByName(this.groupSearchName)
        .subscribe((response) => {
          if (
            response.status === 200 &&
            response.success === true &&
            response.message === 'Search Group name successfully!'
          ) {
            this.groupRowData = response.data;
          }
        });
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
        cat.selected = cat.id === category.id;
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
        lang.selected = lang.id === language.id;
      });
    } else {
      this.selectedLanguages = [];
      language.selected = false;
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageSrc = e.target?.result ?? '';
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  addComic() {
    if (!this.comicName) {
      this.toastr.error('Tên truyện tranh là bắt buộc', 'Thông báo');
      return;
    }

    if (!this.selectedCategories || this.selectedCategories.length === 0) {
      this.toastr.error('Thể loại là bắt buộc', 'Thông báo');
      return;
    }

    if (!this.selectedLanguages || this.selectedLanguages.length === 0) {
      this.toastr.error('Ngôn ngữ là bắt buộc', 'Thông báo');
      return;
    }

    if (!this.selectedTags || this.selectedTags.length === 0) {
      this.toastr.error('Tag là bắt buộc', 'Thông báo');
      return;
    }

    if (!this.selectedParodies || this.selectedParodies.length === 0) {
      this.toastr.error('Parody là bắt buộc', 'Thông báo');
      return;
    }

    if (!this.selectedCharacters || this.selectedCharacters.length === 0) {
      this.toastr.error('Character là bắt buộc', 'Thông báo');
      return;
    }

    if (!this.selectedArtists || this.selectedArtists.length === 0) {
      this.toastr.error('Tác giả là bắt buộc', 'Thông báo');
      return;
    }

    if (!this.selectedGroups || this.selectedGroups.length === 0) {
      this.toastr.error('Nhóm là bắt buộc', 'Thông báo');
      return;
    }

    if (!this.imageFile) {
      this.toastr.error('Ảnh bìa là bắt buộc', 'Thông báo');
      return;
    }

    if (!this.imageFileDetail || this.imageFileDetail.length === 0) {
      this.toastr.error('Ảnh chi tiết là bắt buộc', 'Thông báo');
      return;
    }

    const formData = new FormData();

    formData.append('name', this.comicName);

    const statusValue = this.status ? 1 : 0;
    formData.append('status', statusValue.toString());

    if (this.imageFile) {
      formData.append('profile_picture', this.imageFile);
    }

    this.selectedCategories.forEach(categoryId => {
      formData.append('category_ids', categoryId.toString());
    });

    this.selectedLanguages.forEach(languageId => {
      formData.append('languages_ids', languageId.toString());
    });

    this.selectedArtists.forEach(artistId => {
      formData.append('artists_ids', artistId.toString());
    });

    this.selectedGroups.forEach(groupId => {
      formData.append('groups_ids', groupId.toString());
    });

    this.selectedTags.forEach(tagId => {
      formData.append('tags_ids', tagId.toString());
    });

    this.selectedParodies.forEach(parodyId => {
      formData.append('parodies_ids', parodyId.toString());
    });

    this.selectedCharacters.forEach(characterId => {
      formData.append('characters_ids', characterId.toString());
    });

    this.comicService.addComic(formData).subscribe((response) => {
      if (response.status === 201 && response.message === 'Create a new Comic successful!' && response.success === true) {
        if ((this.imageFileDetail ?? []).length > 0) {
          const comicDetailRequests = (this.imageFileDetail ?? []).map((file, index) => {
            const comicDetail = new FormData();
            comicDetail.append('comic_id', response.data.id);
            comicDetail.append('image_detail', file);
            comicDetail.append('page_number', (index + 1).toString());
            return this.comicService.addComicDetail(comicDetail);
          });

          forkJoin(comicDetailRequests).subscribe(
            (response) => {
              console.log(response);
              this.toastr.success('Thêm thành công', 'Thông báo');
              this.dialogRef.close('addComic');
            },
            (error) => {
              this.toastr.error('Đã xảy ra lỗi khi thêm chi tiết truyện tranh', 'Thông báo');
            }
          );
        }
      } else if (response.status === 200 && response.message === 'Comic with this name already exists.' && response.success === false) {
        this.toastr.error('Comic đã tồn tại', 'Thông báo');
      } else {
        this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
      }
    });
  }

  onDropZoneClick(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const sortedFiles = Array.from(input.files).sort((a, b) => {
        const nameA = a.name.replace(/\D/g, '');
        const nameB = b.name.replace(/\D/g, '');
        const numA = parseInt(nameA, 10);
        const numB = parseInt(nameB, 10);

        if (isNaN(numA) || isNaN(numB)) {
          return a.name.localeCompare(b.name);
        }

        return numA - numB;
      });

      this.imageFileDetail = sortedFiles;

      this.handleFiles(sortedFiles);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const dropZone = document.getElementById('drop-zone');
    dropZone?.classList.add('drop-zone--over');
  }

  onDragLeave(): void {
    const dropZone = document.getElementById('drop-zone');
    dropZone?.classList.remove('drop-zone--over');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const dropZone = document.getElementById('drop-zone');
    dropZone?.classList.remove('drop-zone--over');
    if (event.dataTransfer?.files) {
      const sortedFiles = Array.from(event.dataTransfer.files).sort((a, b) => {
        const nameA = a.name.replace(/\D/g, '');
        const nameB = b.name.replace(/\D/g, '');
        const numA = parseInt(nameA, 10);
        const numB = parseInt(nameB, 10);

        if (isNaN(numA) || isNaN(numB)) {
          return a.name.localeCompare(b.name);
        }

        return numA - numB;
      });

      this.imageFileDetail = sortedFiles;

      this.handleFiles(sortedFiles);
    }
  }

  handleFiles(files: File[]): void {
    this.imagePreviews = [];

    const sortedFiles = files.sort((a, b) => {
      const nameA = a.name.replace(/\D/g, '');
      const nameB = b.name.replace(/\D/g, '');
      const numA = parseInt(nameA, 10);
      const numB = parseInt(nameB, 10);

      if (isNaN(numA) || isNaN(numB)) {
        return a.name.localeCompare(b.name);
      }

      return numA - numB;
    });

    sortedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
}
