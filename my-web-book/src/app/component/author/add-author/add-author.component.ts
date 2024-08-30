import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthorService } from '../../../service/author.service';
import { ToastRef, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-author',
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
    MatSlideToggleModule
  ],
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})

export class AddAuthorComponent {
  authorName: string = '';
  penname: string = '';
  description: string = '';
  birthDate: Date | null = null;
  selectedCountry: string = '';
  status: boolean = true;
  countries: string[] = ['Korea', 'English', 'Japan' , 'China'];
  imageFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddAuthorComponent>,
    private authorService: AuthorService,
    private toastr: ToastrService,
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
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

  addAuthor() {
    const authorData = {
      name: this.authorName,
      penName: this.penname,
      description: this.description,
      birthDate: this.birthDate,
      selectedCountry: this.selectedCountry,
      status: this.status ? 1 : 0
    };

    this.authorService.addAuthor(authorData, this.imageFile).subscribe(response => {
      if (response && response.message) {
        if (response.message === 'Create a new Author successful!') {
          this.toastr.success('Thêm thành công', 'Thông báo');
          this.dialogRef.close("addAuthor");
        } else {
          this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
        }
      } else {
        this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
      }
    }, error => {
      this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
    });
  }
}