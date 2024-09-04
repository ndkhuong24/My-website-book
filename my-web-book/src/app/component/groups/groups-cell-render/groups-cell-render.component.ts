import { ChangeDetectorRef, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { GroupsComponent } from '../groups.component';
import { GroupsService } from '../../../service/groups.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UpdateGroupsComponent } from '../update-groups/update-groups.component';

@Component({
  selector: 'app-groups-cell-render',
  standalone: true,
  imports: [],
  templateUrl: './groups-cell-render.component.html',
  styleUrl: './groups-cell-render.component.scss'
})
export class GroupsCellRenderComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private matdialog: MatDialog,
    private groupsService: GroupsService,
    private groupsComponent: GroupsComponent
  ) { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onRemoveClick() {
    const rowData = this.params.data;

    Swal.fire({
      title: 'Bạn có chắc muốn xóa',
      text: 'Bạn sẽ không thể hoàn tác',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Thoát',
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupsService.deleteById(rowData.id).subscribe((response) => {
          if (response.message === 'Delete Group successful!') {
            this.toastr.success('Xóa thành công', 'Thông báo');
            this.groupsComponent.ngOnInit();
            this.cdr.detectChanges();
          } else {
            this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          }
        });
      }
    });
  }

  onupdateClick() {
    const rowData = this.params.data;

    this.groupsService.getById(rowData.id).subscribe((response) => {
      const dialogRef = this.matdialog.open(UpdateGroupsComponent, {
        width: '45vh',
        height: '45vh',
        disableClose: true,
        data: response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updateGroups') {
          this.groupsComponent.ngOnInit();
          this.cdr.detectChanges();
        }
      });
    });
  }

}
