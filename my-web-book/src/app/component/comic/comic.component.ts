import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ComicService } from '../../service/comic.service';
import { CategoryService } from '../../service/category.service';
import { StatusCellRenderComponent } from './comic-cell-render/status-cell-render.component';

@Component({
  selector: 'app-comic',
  standalone: true,
  imports: [AgGridModule, CommonModule, MatDialogModule],
  templateUrl: './comic.component.html',
  styleUrl: './comic.component.scss'
})
export class ComicComponent implements OnInit {
  isBrowser: boolean;
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  headerHeight: number = 38;
  rowHeight: number = 80;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private comicService: ComicService,
    private categoryService:CategoryService,
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
      this.rowData = response
      console.log(this.rowData)
    })

    this.columnDefs = [
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
        // cellRenderer: ArtistsCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
    ];
  }

  addComic() {
    throw new Error('Method not implemented.');
  }
}