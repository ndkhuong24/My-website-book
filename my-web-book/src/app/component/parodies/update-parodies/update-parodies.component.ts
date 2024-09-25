import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { ParodiesService } from '../../../service/parodies.service';
import Swal from 'sweetalert2';
import e from 'express';

@Component({
  selector: 'app-update-parodies',
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
  templateUrl: './update-parodies.component.html',
  styleUrl: './update-parodies.component.scss'
})
export class UpdateParodiesComponent {
  @ViewChild('parodiesNameInput') parodiesNameInput!: NgModel;

  parodiesName: any;
  status: any;
  parodiesID: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateParodiesComponent>,
    private parodiesService: ParodiesService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.parodiesName = data.name;
    this.status = data.status;
    this.parodiesID = data.id;
  }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  updateParodies() {
    if (!this.parodiesName) {
      this.toastr.error('Tên parodies không được để trống', 'Thông báo');
      this.focusOnErrorField(this.parodiesNameInput);
      return;
    }

    const parodiesData = {
      name: this.parodiesName,
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
        this.parodiesService.updateParodies(this.parodiesID, parodiesData).subscribe((response) => {
          if (response.status === 200 && response.message === 'Update Parodies successful!' && response.success === true) {
            this.toastr.success('Cập nhật thành công', 'Thông báo');
            this.dialogRef.close("updateParodies");
          } else if (response.status === 200 && response.message === 'Parodies with this name already exists.' && response.success === false) {
            this.toastr.error('Tên parodies đã tồn tại', 'Thông báo');
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
