import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { LanguagesService } from '../../../service/languages.service';
import { LanguagesComponent } from '../languages.component';
import Swal from 'sweetalert2';
import { UpdateLanguagesComponent } from '../update-languages/update-languages.component';

@Component({
  selector: 'app-languages-cell-render',
  standalone: true,
  imports: [],
  templateUrl: './languages-cell-render.component.html',
  styleUrl: './languages-cell-render.component.scss'
})
export class LanguagesCellRenderComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private matdialog: MatDialog,
    private languagesService: LanguagesService,
    private languagesComponent: LanguagesComponent
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
        this.languagesService.deleteById(rowData.id).subscribe((response) => {
          if (response.message === 'Delete Languages successful!' && response.status === 200) {
            this.toastr.success('Xóa thành công', 'Thông báo');
            this.languagesComponent.ngOnInit();
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

    this.languagesService.getById(rowData.id).subscribe((response) => {
      const dialogRef = this.matdialog.open(UpdateLanguagesComponent, {
        width: '45vh',
        height: '45vh',
        disableClose: true,
        data: response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updateLanguages') {
          this.languagesComponent.ngOnInit();
          this.cdr.detectChanges();
        }
      });
    });
  }
}
