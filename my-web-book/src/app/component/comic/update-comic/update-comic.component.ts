import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AgGridModule } from 'ag-grid-angular';
import { ComicService } from '../../../service/comic.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { CategoryService } from '../../../service/category.service';
import { subscribe } from 'diagnostics_channel';
import { LanguagesService } from '../../../service/languages.service';

@Component({
  selector: 'app-update-comic',
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
  templateUrl: './update-comic.component.html',
  styleUrl: './update-comic.component.scss'
})
export class UpdateComicComponent {
  status: boolean = true;
  comicName: string;
  imageFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;

  categoryActive: any[] = [];
  languagesActive: any[] = [];

  selectedCategories: any[] = [];
  selectedLanguages: any[] = [];

  imagePreviews: string[] = [];
  imageFileDetail: File[] | [] | undefined;

  constructor(
    private dialogRef: MatDialogRef<UpdateComicComponent>,
    private comicService: ComicService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) dataCurrent: any,

    private categoryService: CategoryService,
    private languagesService: LanguagesService,
  ) {
    this.comicName = dataCurrent.name;
    this.status = dataCurrent.status;
    this.imageSrc = dataCurrent.profile_picture;

    forkJoin({
      categories: this.categoryService.getAllCategory(),
      languages: this.languagesService.getAllLanguages(),
    }).subscribe((results: any) => {
      this.categoryActive = results.categories.filter(
        (category: any) => category.status === 1
      );

      this.languagesActive = results.languages.filter(
        (language: any) => language.status === 1
      );

      this.categoryActive = this.categoryActive.map(category => {
        return {
          ...category,
          selected: dataCurrent.category.some((cat: any) => cat.id === category.id)
        };
      });

      this.languagesActive = this.languagesActive.map(language => {
        return {
          ...language,
          selected: dataCurrent.languages.some((lang: any) => lang.id === language.id)
        };
      });
    })
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

  updateComic() {
    throw new Error('Method not implemented.');
  }

  onCancel() {
    this.dialogRef.close();
  }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
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
