import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { TagsService } from '../../service/tags.service';
import { AgGridModule } from 'ag-grid-angular';
import { StatusCellRenderComponent } from './tags-cell-render/status-cell-render.component';
import { TagsCellRenderComponent } from './tags-cell-render/tags-cell-render.component';
import { AddTagsComponent } from './add-tags/add-tags.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [AgGridModule, CommonModule, MatDialogModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent implements OnInit {
  isBrowser: boolean;
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  headerHeight: number = 38;
  rowHeight: number = 80;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tagsService: TagsService,
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
    this.tagsService.getAllTags().subscribe((response) => {
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
        cellRenderer: TagsCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        
      },
    ];
  }

  addTags() {
    const dialogRef = this.matdialog.open(AddTagsComponent, {
      width: '45vh',
      height: '45vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'addTags') {
        // Handle the result here
        this.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }
}