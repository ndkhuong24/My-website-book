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
import { ParodiesService } from '../../../service/parodies.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-parodies',
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
  templateUrl: './add-parodies.component.html',
  styleUrl: './add-parodies.component.scss'
})
export class AddParodiesComponent {
  @ViewChild('parodiesNameInput') parodiesNameInput!: NgModel;

  parodiesName: string = '';
  status: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddParodiesComponent>,
    private toastr: ToastrService,
    private parodiesService: ParodiesService
  ) { }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  addParodies() {
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
        this.parodiesService.addParodies(parodiesData).subscribe((response) => {
          if (response && response.message) {
            if (response.message === 'Create a new Parodies successful!') {
              this.toastr.success('Thêm thành công', 'Thông báo');
              this.dialogRef.close("addParodies");
            } else if (response.error) {
              this.toastr.error('Tên parodies Vui lòng chọn tin khác', 'Thông báo');
            } else {
              this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
            }
          } else {
            this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          }
        }, error => {
          if (error.error && error.error.error) {
            this.toastr.error('Tên parodies trùng. Vui lòng chọn tin khác', 'Thông báo');
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
