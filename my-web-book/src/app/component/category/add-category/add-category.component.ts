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
import Swal from 'sweetalert2';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-add-category',
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
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  @ViewChild('categoryNameInput') categoryNameInput!: NgModel;

  status: boolean = true;
  categoryName: any;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) { }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  addCategory() {
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
        this.categoryService.addCategory(categoryData).subscribe(response => {
          if (response && response.message) {
            if (response.message === 'Create a new Category successful!') {
              this.toastr.success('Thêm thành công', 'Thông báo');
              this.dialogRef.close("addCategory");
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
