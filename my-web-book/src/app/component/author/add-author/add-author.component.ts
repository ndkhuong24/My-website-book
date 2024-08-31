import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
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
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
  @ViewChild('authorNameInput') authorNameInput!: NgModel;
  @ViewChild('penNameInput') penNameInput!: NgModel;
  @ViewChild('descriptionInput') descriptionInput!: NgModel;

  authorName: string = '';
  penName: string = '';
  description: string = '';
  birthDate: Date | null = null;
  selectedCountry: string = '';
  status: boolean = true;
  countries: string[] = ['Korea', 'English', 'Japan', 'China'];
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
    if (!this.authorName) {
      this.toastr.error('Tên tác giả không được để trống', 'Thông báo');
      this.focusOnErrorField(this.authorNameInput);
      return;
    }

    if (!this.penName) {
      this.toastr.error('Bút danh không được để trống', 'Thông báo');
      this.focusOnErrorField(this.penNameInput);
      return;
    }

    if (!this.description) {
      this.toastr.error('Mô tả không được để trống', 'Thông báo');
      this.focusOnErrorField(this.descriptionInput);
      return;
    }

    if (!this.birthDate) {
      this.toastr.error('Ngày sinh không được để trống', 'Thông báo');
      return;
    }

    if (!this.selectedCountry) {
      this.toastr.error('Quốc gia không được để trống', 'Thông báo');
      return;
    }

    if (!this.imageFile) {
      this.toastr.error('Vui lòng tải lên hình ảnh', 'Thông báo');
      return;
    }

    const authorData = {
      name: this.authorName,
      penName: this.penName,
      description: this.description,
      birthDate: this.birthDate,
      selectedCountry: this.selectedCountry,
      status: this.status ? 1 : 0
    };

    Swal.fire({
      title: 'Bạn muốn thêm',
      text: 'Thao tác này sẽ không hoàn tác',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Thêm',
      cancelButtonText: 'Thoát',
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  }

  focusOnErrorField(field: NgModel): void {
    if (field?.invalid) {
      setTimeout(() => {
        const element = document.querySelector(`[name="${field.name}"]`) as HTMLInputElement;
        element?.focus();
      }, 0);
    }
  }
}