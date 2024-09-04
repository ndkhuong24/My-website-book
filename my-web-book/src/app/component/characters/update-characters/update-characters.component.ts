import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CharactersService } from '../../../service/characters.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-characters',
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
  templateUrl: './update-characters.component.html',
  styleUrl: './update-characters.component.scss'
})
export class UpdateCharactersComponent {
  @ViewChild('charactersNameInput') charactersNameInput!: NgModel;

  charactersName: string;
  status: boolean;
  charactersID: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateCharactersComponent>,
    private charactersService: CharactersService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.charactersName = data.name;
    this.status = data.status;
    this.charactersID = data.id;
  }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  updateCharacters() {
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
        this.charactersService.updadteCharacters(this.charactersID, charactersData).subscribe((response) => {
          if (response && response.message) {
            if (response.message === 'Update Characters successful!') {
              this.toastr.success('Cập nhật thành công', 'Thông báo');
              this.dialogRef.close("updateCharacters");
            } else if (response.error) {
              this.toastr.error('Tên characters bị trùng. Vui lòng chọn tin khác', 'Thông báo');
            } else {
              this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
            }
          } else {
            this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          }
        }, error => {
          if (error.error && error.error.error) {
            this.toastr.error('Tên characters bị trùng. Vui lòng chọn tin khác', 'Thông báo');
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
