import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { TagsService } from '../../../service/tags.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-tags',
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
  templateUrl: './update-tags.component.html',
  styleUrl: './update-tags.component.scss'
})
export class UpdateTagsComponent {
  @ViewChild('tagsNameInput') tagsNameInput!: NgModel;

  tagsName: string;
  status: boolean;
  tagsID: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateTagsComponent>,
    private tagsService: TagsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.tagsName = data.name;
    this.status = data.status;
    this.tagsID = data.id;
  }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  updateTags() {
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
      title: 'Bạn muốn cập nhật',
      text: 'Thao tác này sẽ không hoàn tác',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cập nhật',
      cancelButtonText: 'Thoát',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tagsService.updateTags(this.tagsID, tagsData).subscribe((response) => {
          if (response.status == 200 && response.success == true && response.message == 'Update Tags successful!') {
            this.toastr.success('Cập nhật thành công', 'Thông báo');
            this.dialogRef.close("updateTags");
          } else if (response.status == 200 && response.success == false && response.message == 'Tags with this name already exists.') {
            this.toastr.error('Tên tag đã tồn tại', 'Thông báo');
          } else {
            this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          }
        });
      }
    })
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
