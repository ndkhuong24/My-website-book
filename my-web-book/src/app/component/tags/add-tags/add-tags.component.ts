import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TagsService } from '../../../service/tags.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tags',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule],
  templateUrl: './add-tags.component.html',
  styleUrl: './add-tags.component.scss'
})
export class AddTagsComponent {
  @ViewChild('tagsNameInput') tagsNameInput!: NgModel;

  tagsName: string = '';
  status: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddTagsComponent>,
    private toastr: ToastrService,
    private tagsService: TagsService
  ) { }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  addTags() {
    if (!this.tagsName) {
      this.toastr.error('Tên tags không được để trống', 'Thông báo');
      this.focusOnErrorField(this.tagsNameInput);
      return;
    }

    const tagsData = {
      name: this.tagsName,
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
        this.tagsService.addTags(tagsData).subscribe(response => {
          if (response && response.message) {
            if (response.message === 'Create a new Tags successful!') {
              this.toastr.success('Thêm thành công', 'Thông báo');
              this.dialogRef.close("addTags");
            } else if (response.error) {
              this.toastr.error('Tên tags loại trùng. Vui lòng chọn tin khác', 'Thông báo');
            } else {
              this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
            }
          } else {
            this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          }
        }, error => {
          if (error.error && error.error.error) {
            this.toastr.error('Tên tags loại trùng. Vui lòng chọn tin khác', 'Thông báo');
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
