import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { LanguagesService } from '../../../service/languages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-languages',
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
  templateUrl: './add-languages.component.html',
  styleUrl: './add-languages.component.scss'
})
export class AddLanguagesComponent {
  @ViewChild('languagesNameInput') languagesNameInput!: NgModel;

  languagesName: string = '';
  status: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddLanguagesComponent>,
    private toastr: ToastrService,
    private languagesService: LanguagesService
  ) { }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  addLanguages() {
    if (!this.languagesName) {
      this.toastr.error('Tên ngôn ngữ không được để trống', 'Thông báo');
      this.focusOnErrorField(this.languagesNameInput);
      return;
    }

    const languagesData = {
      name: this.languagesName,
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
        this.languagesService.addLanguages(languagesData).subscribe(response => {
          if (response.status == 201 && response.message === 'Create a new Languages successful!' && response.success === true) {
            this.toastr.success('Thêm thành công', 'Thông báo');
            this.dialogRef.close("addLanguages");
          } else if (response.status == 200 && response.success === false && response.message === 'Languages with this name already exists.') {
            this.toastr.error('Ngôn ngữ đã tồn tại', 'Thông báo');
          } else {
            this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          }
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
