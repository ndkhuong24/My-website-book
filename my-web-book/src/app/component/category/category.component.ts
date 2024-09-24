import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CategoryService } from '../../service/category.service';
import { StatusCellRenderComponent } from './category-cell-render/status-cell-render.component';
import { CategoryCellRenderComponent } from './category-cell-render/category-cell-render.component';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [AgGridModule, CommonModule, MatDialogModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  isBrowser: boolean;
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  headerHeight: number = 38;
  rowHeight: number = 80;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private categoryService: CategoryService,
    private matdialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initAgGrid();
    }
  }

  initAgGrid() {
    this.categoryService.getAllCategory().subscribe((response) => {
      this.rowData = response
    })

    this.columnDefs = [
      {
        headerName: 'STT',
        valueGetter: (params) => params.node?.rowIndex != null ? params.node.rowIndex + 1 : null,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
      },
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        sortable: true,
        filter: true,
        cellRenderer: StatusCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
      },
      {
        headerName: 'Chức năng',
        field: 'actions',
        cellRenderer: CategoryCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
      },
    ];
  }

  addCategory(): void {
    const dialogRef = this.matdialog.open(AddCategoryComponent, {
      width: '45vh',
      height: '45vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'addCategory') {
        this.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }
}
