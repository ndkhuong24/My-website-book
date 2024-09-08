import { ChangeDetectorRef, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ParodiesComponent } from '../parodies.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ParodiesService } from '../../../service/parodies.service';
import Swal from 'sweetalert2';
import { UpdateParodiesComponent } from '../update-parodies/update-parodies.component';

@Component({
  selector: 'app-parodies-cell-render',
  standalone: true,
  imports: [],
  templateUrl: './parodies-cell-render.component.html',
  styleUrl: './parodies-cell-render.component.scss'
})
export class ParodiesCellRenderComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private matdialog: MatDialog,
    private parodiesService: ParodiesService,
    private parodiesComponent: ParodiesComponent
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
        this.parodiesService.deleteById(rowData.id).subscribe((response) => {
          if (response.status === 200) {
            this.toastr.success('Xóa thành công', 'Thông báo');
            this.parodiesComponent.ngOnInit();
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

    this.parodiesService.getById(rowData.id).subscribe((response) => {
      const dialogRef = this.matdialog.open(UpdateParodiesComponent, {
        width: '45vh',
        height: '45vh',
        disableClose: true,
        data: response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updateParodies') {
          this.parodiesComponent.ngOnInit();
          this.cdr.detectChanges();
        }
      });
    });
  }
}
