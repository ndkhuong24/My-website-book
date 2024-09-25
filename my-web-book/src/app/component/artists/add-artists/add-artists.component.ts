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
import { ArtistsService } from '../../../service/artists.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-artists',
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
  templateUrl: './add-artists.component.html',
  styleUrl: './add-artists.component.scss'
})
export class AddArtistsComponent {
  @ViewChild('artistsNameInput') artistsNameInput!: NgModel;

  artistsName: string = '';
  status: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddArtistsComponent>,
    private toastr: ToastrService,
    private artistsService: ArtistsService
  ) { }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  addArtists() {
    if (!this.artistsNameInput) {
      this.toastr.error('Tên artists không được để trống', 'Thông báo');
      this.focusOnErrorField(this.artistsNameInput);
      return;
    }

    const artistsData = {
      name: this.artistsName,
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
        this.artistsService.addArtists(artistsData).subscribe((response) => {
          if (response.status === 201 && response.statusText === "Create a new Artists successful!" && response.success === true) {
            this.toastr.success('Thêm thành công', 'Thông báo');
            this.dialogRef.close("addArtists");
          } else if (response.success === false && response.message === "Artists with this name already exists." && response.status === 200) {
            this.toastr.error('Tên artists đã tồn tại', 'Thông báo');
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
