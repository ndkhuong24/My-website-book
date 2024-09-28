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
import { GroupsService } from '../../../service/groups.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-groups',
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
  templateUrl: './update-groups.component.html',
  styleUrl: './update-groups.component.scss'
})
export class UpdateGroupsComponent {
  @ViewChild('groupsNameInput') groupsNameInput!: NgModel;

  groupsName: string;
  status: boolean;
  groupsID: number;

  constructor(
    public dialogRef: MatDialogRef<UpdateGroupsComponent>,
    private groupsService: GroupsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.groupsName = data.name;
    this.status = data.status;
    this.groupsID = data.id;
  }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  updateGroups() {
    if (!this.groupsName) {
      this.toastr.error('Tên groups không được để trống', 'Thông báo');
      this.focusOnErrorField(this.groupsNameInput);
      return;
    }

    const groupsData = {
      name: this.groupsName,
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
        this.groupsService.updateGroups(this.groupsID, groupsData).subscribe(
          (response) => {
            if (response.status === 200 && response.success === true && response.message === 'Update Groups successful!') {
              this.toastr.success('Cập nhật thành công', 'Thông báo');
              this.dialogRef.close("updateGroups");
            } else if (response.status === 200 && response.success === false && response.message === 'Groups with this name already exists.') {
              this.toastr.error('Groups đã tồn tại', 'Thông báo');
            } else {
              this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
            }
          })
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

