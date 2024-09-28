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
import { GroupsService } from '../../../service/groups.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ResponseMessage } from '../../../models/response.model';
import { error } from 'console';
import e from 'express';

@Component({
  selector: 'app-add-groups',
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
  templateUrl: './add-groups.component.html',
  styleUrl: './add-groups.component.scss'
})
export class AddGroupsComponent {
  @ViewChild('groupsNameInput') groupsNameInput!: NgModel;

  groupsName: string = '';
  status: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddGroupsComponent>,
    private toastr: ToastrService,
    private groupsService: GroupsService
  ) { }

  onStatusChange(newStatus: boolean): void {
    this.status = newStatus;
  }

  onCancel() {
    this.dialogRef.close();
  }

  addGroups() {
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
        this.groupsService.addGroups(groupsData).subscribe(
          (response) => {
            if (response.status === 201 && response.success === true && response.message === 'Create a new Groups successful!') {
              this.toastr.success('Thêm thành công', 'Thông báo');
              this.dialogRef.close("addGroups");
            } else if (response.status === 200 && response.success === false && response.message === 'Groups with this name already exists.') {
              this.toastr.error('Groups đã tồn tại', 'Thông báo');
            } else {
              this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
            }
          }
        )
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
