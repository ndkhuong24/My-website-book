import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry } from '@ag-grid-community/core';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { ComicService } from '../../service/comic.service';
import { CategoryService } from '../../service/category.service';
import { StatusCellRenderComponent } from './comic-cell-render/status-cell-render.component';
import { response } from 'express';
import { ComicCellRenderComponent } from './comic-cell-render/comic-cell-render.component';
import { AddComicComponent } from './add-comic/add-comic.component';

@Component({
  selector: 'app-comic',
  standalone: true,
  imports: [
    AgGridModule,
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})


export class ComicComponent implements OnInit {
  isBrowser: boolean;
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  headerHeight: number = 38;
  rowHeight: number = 100;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private comicService: ComicService,
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

  initAgGrid(): void {
    this.comicService.getAllComic().subscribe((response) => {
      this.rowData = response;
    });

    this.columnDefs = [
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
      },
      {
        headerName: 'Ảnh bìa',
        field: 'profile_picture',
        sortable: true,
        cellRenderer: (params: { value: any }) => {
          return `<img src="${params.value}" style="height: 100px; width: auto;"/>`;
        },
      },
      {
        headerName: 'Tags',
        field: 'tags',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        valueFormatter: (params: { value: any }) => {
          if (Array.isArray(params.value)) {
            return `${params.value.length} tags`;
          } else {
            return 'No tags';
          }
        },
      },
      {
        headerName: 'Thể loại',
        valueGetter: (params: { data: any }) => {
          if (params.data && params.data.category && params.data.category.length > 0) {
            return params.data.category[0].name;
          } else {
            return 'Chưa có thể loại';
          }
        },
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
      },
      {
        headerName: 'Ngôn ngữ',
        valueGetter: (params: { data: any }) => {
          if (params.data && params.data.languages && params.data.languages.length > 0) {
            return params.data.languages[0].name;
          } else {
            return 'Chưa có ngôn ngữ';
          }
        },
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
      },
      {
        headerName: 'Artists',
        field: 'artists',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        valueFormatter: (params: { value: any }) => {
          if (Array.isArray(params.value)) {
            return `${params.value.length} artists`;
          } else {
            return 'No artists';
          }
        },
      },
      {
        headerName: 'Groups',
        field: 'groups',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        valueFormatter: (params: { value: any }) => {
          if (Array.isArray(params.value)) {
            return `${params.value.length} groups`;
          } else {
            return 'No groups';
          }
        },
      },
      {
        headerName: 'Parodies',
        field: 'parodies',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        valueFormatter: (params: { value: any }) => {
          if (Array.isArray(params.value)) {
            return `${params.value.length} parodies`;
          } else {
            return 'No parodies';
          }
        },
      },
      {
        headerName: 'Characters',
        field: 'characters',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        valueFormatter: (params: { value: any }) => {
          if (Array.isArray(params.value)) {
            return `${params.value.length} characters`;
          } else {
            return 'No characters';
          }
        },
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
        cellRenderer: ComicCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        pinned: 'right',
      },
    ];
  }

  addComic() {
    const dialogRef = this.matdialog.open(AddComicComponent, {
      width: '150vh',
      height: '100vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'addComic') {
        this.ngOnInit();
        this.cdr.detectChanges();
      }
    })
  }
}