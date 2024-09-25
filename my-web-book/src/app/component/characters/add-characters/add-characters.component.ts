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
import { CharactersService } from '../../../service/characters.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-characters',
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
  templateUrl: './add-characters.component.html',
  styleUrl: './add-characters.component.scss'
})
export class AddCharactersComponent {
  @ViewChild('charactersNameInput') charactersNameInput!: NgModel;

  charactersName: string = '';
  status: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddCharactersComponent>,
    private toastr: ToastrService,
    private charactersService: CharactersService
  ) { }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  addCharacters() {
    if (!this.charactersName) {
      this.toastr.error('Tên characters không được để trống', 'Thông báo');
      this.focusOnErrorField(this.charactersNameInput);
      return;
    }

    const charactersData = {
      name: this.charactersName,
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
        this.charactersService.addCharacters(charactersData).subscribe((response) => {
          if (response.status === 201 && response.message === 'Create a new Characters successful!' && response.success === true) {
            this.toastr.success('Thêm thành công', 'Thông báo');
            this.dialogRef.close("addCharacters");
          } else if (response.status === 200 && response.success === false && response.message === 'Characters with this name already exists.') {
            this.toastr.error('Character đã tồn tại', 'Thông báo');
          } else {
            this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          }
          //   if (response && response.message) {
          //     if (response.message === 'Create a new Characters successful!') {
          //       this.toastr.success('Thêm thành công', 'Thông báo');
          //       this.dialogRef.close("addCharacters");
          //     } else if (response.error) {
          //       this.toastr.error('Tên characters trùng. Vui lòng chọn tin khác', 'Thông báo');
          //     } else {
          //       this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          //     }
          //   } else {
          //     this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          //   }
          // }, error => {
          //   if (error.error && error.error.error) {
          //     this.toastr.error('Tên characters trùng. Vui lòng chọn tin khác', 'Thông báo');
          //   } else {
          //     this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          //   }
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
