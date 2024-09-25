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
import { ArtistsService } from '../../../service/artists.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-artists',
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
  templateUrl: './update-artists.component.html',
  styleUrl: './update-artists.component.scss'
})
export class UpdateArtistsComponent {
  @ViewChild('artistsNameInput') artistsNameInput!: NgModel;

  artistsName: string;
  status: boolean;
  artistsID: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateArtistsComponent>,
    private artistsService: ArtistsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.artistsName = data.name;
    this.status = data.status;
    this.artistsID = data.id;
  }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  updateArtists() {
    if (!this.artistsName) {
      this.toastr.error('Tên artists không được để trống', 'Thông báo');
      this.focusOnErrorField(this.artistsNameInput);
      return;
    }

    const artistsData = {
      name: this.artistsName,
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
        this.artistsService.updateArtists(this.artistsID, artistsData).subscribe((response) => {
          if (response.status === 200 && response.message === "Update Artists successful!" && response.success === true) {
            this.toastr.success('Cập nhật thành công', 'Thông báo');
            this.dialogRef.close("updateArtists");
          } else if (response.status === 200 && response.success === false && response.message === "Artists with this name already exists.") {
            this.toastr.error('Tên artists đã tồn tại', 'Thông báo');
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
