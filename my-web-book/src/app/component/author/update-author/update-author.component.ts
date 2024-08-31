import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { AuthorService } from '../../../service/author.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthorComponent } from '../author.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-author',
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
  templateUrl: './update-author.component.html',
  styleUrl: './update-author.component.scss'
})
export class UpdateAuthorComponent {
  // @ViewChild('authorNameInput') authorNameInput!: NgModel;
  // @ViewChild('penNameInput') penNameInput!: NgModel;
  // @ViewChild('descriptionInput') descriptionInput!: NgModel;
  @ViewChild('authorNameInput') authorNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('penNameInput') penNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionInput') descriptionInput!: ElementRef<HTMLInputElement>;


  author = {
    id: 0,
    name: "",
    pen_name: "",
    bio: "",
    birth_date: "",
    nationality: "",
    profile_picture: "",
    status: 0
  };

  status: boolean;
  imageFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  countries: string[] = ['Korea', 'English', 'Japan', 'China'];
  selectedCountry: string = '';

  constructor(
    public dialogRef: MatDialogRef<UpdateAuthorComponent>,
    private authorService: AuthorService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.author = data;
    this.status = data.status;
    this.selectedCountry = data.nationality;
  }

  onStatusChange(event: boolean): void {
    this.status = event;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // updateAuthor(): void {
  //   if (!this.author.name) {
  //     this.toastr.error('Tên tác giả không được để trống', 'Thông báo');
  //     this.focusOnErrorField(this.authorNameInput);
  //     return;
  //   }

  //   if (!this.author.pen_name) {
  //     this.toastr.error('Bút danh không được để trống', 'Thông báo');
  //     this.focusOnErrorField(this.penNameInput);
  //     return;
  //   }

  //   if (!this.author.bio) {
  //     this.toastr.error('Mô tả không được để trống', 'Thông báo');
  //     this.focusOnErrorField(this.descriptionInput);
  //     return;
  //   }

  //   if (!this.author.birth_date) {
  //     this.toastr.error('Ngày sinh không được để trống', 'Thông báo');
  //     return;
  //   }

  //   if (!this.selectedCountry) {
  //     this.toastr.error('Quốc gia không được để trống', 'Thông báo');
  //     return;
  //   }

  //   if (!this.imageFile) {
  //     this.toastr.error('Vui lòng tải lên hình ảnh', 'Thông báo');
  //     return;
  //   }

  //   const authorDataCurrent = {
  //     id: this.author.id,
  //     name: this.author.name,
  //     penName: this.author.pen_name,
  //     description: this.author.bio,
  //     birthDate: this.author.birth_date,
  //     selectedCountry: this.selectedCountry,
  //     status: this.status ? 1 : 0
  //   };

  //   Swal.fire({
  //     title: 'Bạn muốn thêm',
  //     text: 'Thao tác này sẽ không hoàn tác',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Thêm',
  //     cancelButtonText: 'Thoát',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.authorService.updateAuthor(this.author.id, authorDataCurrent, this.imageFile).subscribe(
  //         (response) => {
  //           if (response && response.message) {
  //             if (response.message === 'Update Author successful!') {
  //               this.toastr.success('Cập nhật thành công', 'Thông báo');
  //               this.dialogRef.close("updateAuthor");
  //             } else {
  //               this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
  //             }
  //           } else {
  //             this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
  //           }
  //         },
  //         error => {
  //           this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
  //         }
  //       );
  //     }
  //   })
  // }

  updateAuthor(): void {
    // if (!this.author.name) {
    //   this.toastr.error('Tên tác giả không được để trống', 'Thông báo');
    //   setTimeout(() => {
    //     const inputElement = document.querySelector('#authorNameInput') as HTMLInputElement;
    //     if (inputElement) {
    //       inputElement.focus();
    //     }
    //   }, 100);
    //   return;
    // }

    // if (!this.author.pen_name) {
    //   this.toastr.error('Bút danh không được để trống', 'Thông báo');
    //   setTimeout(() => {
    //     const inputElement = document.querySelector('#penNameInput') as HTMLInputElement;
    //     if (inputElement) {
    //       inputElement.focus();
    //     }
    //   }, 100); 
    //   return;
    // }

    // if (!this.author.bio) {
    //   this.toastr.error('Mô tả không được để trống', 'Thông báo');
    //   setTimeout(() => {
    //     const inputElement = document.querySelector('#descriptionInput') as HTMLInputElement;
    //     if (inputElement) {
    //       inputElement.focus();
    //     }
    //   }, 100);
    //   return;
    // }
    if (!this.author.name) {
      this.toastr.error('Tên tác giả không được để trống', 'Thông báo');
      setTimeout(() => {
        this.authorNameInput.nativeElement.focus();
      }, 100);
      return;
    }

    if (!this.author.pen_name) {
      this.toastr.error('Bút danh không được để trống', 'Thông báo');
      setTimeout(() => {
        this.penNameInput.nativeElement.focus();
      }, 100);
      return;
    }

    if (!this.author.bio) {
      this.toastr.error('Mô tả không được để trống', 'Thông báo');
      setTimeout(() => {
        this.descriptionInput.nativeElement.focus();
      }, 100);
      return;
    }

    if (!this.author.birth_date) {
      this.toastr.error('Ngày sinh không được để trống', 'Thông báo');
      return;
    }

    if (!this.selectedCountry) {
      this.toastr.error('Quốc gia không được để trống', 'Thông báo');
      return;
    }

    if (!this.imageFile && !this.author.profile_picture) {
      this.toastr.error('Vui lòng tải lên hình ảnh', 'Thông báo');
      return;
    }

    const authorDataCurrent = {
      id: this.author.id,
      name: this.author.name,
      penName: this.author.pen_name,
      description: this.author.bio,
      birthDate: this.author.birth_date,
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
        this.authorService.updateAuthor(this.author.id, authorDataCurrent, this.imageFile).subscribe(
          (response) => {
            if (response && response.message) {
              if (response.message === 'Update Author successful!') {
                this.toastr.success('Cập nhật thành công', 'Thông báo');
                this.dialogRef.close("updateAuthor");
              } else {
                this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
              }
            } else {
              this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
            }
          },
          error => {
            this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          }
        );
      }
    });
  }

  // focusOnErrorField(elementRef: ElementRef): void {
  //   setTimeout(() => {
  //     elementRef.nativeElement.focus();
  //   }, 100);
  // }

  // focusOnErrorField(field: NgModel): void {
  //   if (field?.invalid) {
  //     setTimeout(() => {
  //       const element = document.querySelector(`[name="${field.name}"]`) as HTMLInputElement;
  //       element?.focus();
  //     }, 0);
  //   }
  // }
}
