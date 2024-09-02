import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TagsComponent } from '../tags.component';
import { TagsService } from '../../../service/tags.service';
import { UpdateTagsComponent } from '../update-tags/update-tags.component';

@Component({
  selector: 'app-tags-cell-render',
  standalone: true,
  imports: [],
  templateUrl: './tags-cell-render.component.html',
  styleUrl: './tags-cell-render.component.scss'
})
export class TagsCellRenderComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private matdialog: MatDialog,
    private tagsService: TagsService,
    private tagsComponent: TagsComponent
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
        this.tagsService.deleteById(rowData.id).subscribe((response) => {
          if (response.message === 'Delete Tags successful!') {
            this.toastr.success('Xóa thành công', 'Thông báo');
            this.tagsComponent.ngOnInit();
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

    this.tagsService.getById(rowData.id).subscribe((response) => {
      const dialogRef = this.matdialog.open(UpdateTagsComponent, {
        width: '45vh',
        height: '45vh',
        disableClose: true,
        data: response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updateTags') {
          this.tagsComponent.ngOnInit();
          this.cdr.detectChanges();
        }
      });
    });
  }

}
