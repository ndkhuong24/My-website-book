import { Component, Inject, ViewChild } from '@angular/core';
import { CategoryService } from '../../../service/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
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
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {
  @ViewChild('categoryNameInput') categoryNameInput!: NgModel;

  status: boolean;
  categoryName: string;
  categoryId: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.categoryName = data.name;
    this.status = data.status;
    this.categoryId = data.id;
  }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  updateCategory() {
    if (!this.categoryName) {
      this.toastr.error('Tên thể loại không được để trống', 'Thông báo');
      this.focusOnErrorField(this.categoryNameInput);
      return;
    }

    const categoryData = {
      name: this.categoryName,
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
        this.categoryService.updateCategory(this.categoryId, categoryData).subscribe((response) => {
          if (response && response.status) {
            if (response.status === 200) {
              this.toastr.success('Cập nhật thành công', 'Thông báo');
              this.dialogRef.close("updateCategory");
            } else if (response.error) {
              // Trường hợp tên thể loại bị trùng
              // this.toastr.error(response.error, 'Thông báo');
              this.toastr.error('Tên thể loại bị trùng. Vui lòng chọn tin khác', 'Thông báo');
            } else {
              this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
            }
          } else {
            this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          }
        }, error => {
          // Kiểm tra nếu lỗi do tên bị trùng
          if (error.error && error.error.error) {
            this.toastr.error('Tên thể loại bị trùng. Vui lòng chọn tin khác', 'Thông báo');
            // this.toastr.error(error.error.error, 'Thông báo');
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
