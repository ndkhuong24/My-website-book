import { ChangeDetectorRef, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { AuthorService } from '../../../service/author.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthorComponent } from '../author.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAuthorComponent } from '../update-author/update-author.component';

@Component({
  selector: 'app-author-cell-render',
  standalone: true,
  imports: [ToastrModule],
  templateUrl: './author-cell-render.component.html',
  styleUrl: './author-cell-render.component.scss'
})

export class AuthorCellRenderComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  constructor(
    private authorService: AuthorService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private authorComponent: AuthorComponent,
    private matdialog: MatDialog,
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
        this.authorService.deleteById(rowData.id).subscribe((response) => {
          if (response.message === 'Delete Author successful!') {
            this.toastr.success('Xóa thành công', 'Thông báo');
            this.authorComponent.ngOnInit();
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

    this.authorService.getById(rowData.id).subscribe((response) => {
      const dialogRef = this.matdialog.open(UpdateAuthorComponent, {
        width: '80vh',
        height: '80vh',
        disableClose: true,
        data: response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updateAuthor') {
          // Handle the result here
          this.authorComponent.ngOnInit();
          this.cdr.detectChanges();
        }
      });
    });
  }
}