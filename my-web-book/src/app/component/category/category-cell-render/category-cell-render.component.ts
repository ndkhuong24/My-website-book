import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../service/category.service';
import { CategoryComponent } from '../category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
  selector: 'app-category-cell-render',
  standalone: true,
  imports: [],
  templateUrl: './category-cell-render.component.html',
  styleUrl: './category-cell-render.component.scss'
})
export class CategoryCellRenderComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private matdialog: MatDialog,
    private categoryService: CategoryService,
    private categoryComponen: CategoryComponent
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
        this.categoryService.deleteById(rowData.id).subscribe((response) => {
          if (response.status === 200) {
            this.toastr.success('Xóa thành công', 'Thông báo');
            this.categoryComponen.ngOnInit();
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

    this.categoryService.getById(rowData.id).subscribe((response) => {
      const dialogRef = this.matdialog.open(UpdateCategoryComponent, {
        width: '45vh',
        height: '45vh',
        disableClose: true,
        data: response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updateCategory') {
          this.categoryComponen.ngOnInit();
          this.cdr.detectChanges();
        }
      });
    });
  }
}
