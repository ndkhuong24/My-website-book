import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { AuthorCellRenderComponent } from '../author/author-cell-render/author-cell-render.component';
import { ColDef } from 'ag-grid-community';
import { ParodiesService } from '../../service/parodies.service';
import { StatusCellRenderComponent } from './parodies-cell-render/status-cell-render.component';
import { ParodiesCellRenderComponent } from './parodies-cell-render/parodies-cell-render.component';
import { AddParodiesComponent } from './add-parodies/add-parodies.component';

@Component({
  selector: 'app-parodies',
  standalone: true,
  imports: [AgGridModule, CommonModule, AuthorCellRenderComponent, MatDialogModule],
  templateUrl: './parodies.component.html',
  styleUrl: './parodies.component.scss'
})
export class ParodiesComponent implements OnInit {
  isBrowser: boolean;
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  headerHeight: number = 38;
  rowHeight: number = 80;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private matdialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private parodiesService: ParodiesService

  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initAgGrid();
    }
  }

  initAgGrid() {
    this.parodiesService.getAllParodies().subscribe((response) => {
      this.rowData = response
    })

    this.columnDefs = [
      {
        headerName: 'STT',
        valueGetter: (params) => params.node?.rowIndex != null ? params.node.rowIndex + 1 : null,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        sortable: true,
        filter: true,
        cellRenderer: StatusCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      {
        headerName: 'Chức năng',
        field: 'actions',
        cellRenderer: ParodiesCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
    ];
  }

  addParodies() {
    const dialogRef = this.matdialog.open(AddParodiesComponent, {
      width: '45vh',
      height: '45vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'addParodies') {
        this.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }
}
