import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ArtistsService } from '../../service/artists.service';
import { StatusCellRenderComponent } from './artists-cell-render/status-cell-render.component';
import { ArtistsCellRenderComponent } from './artists-cell-render/artists-cell-render.component';
import { AddArtistsComponent } from './add-artists/add-artists.component';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [
    AgGridModule, CommonModule, MatDialogModule
  ],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent implements OnInit {
  isBrowser: boolean;
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  headerHeight: number = 38;
  rowHeight: number = 80;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private artistsService: ArtistsService,
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
    this.artistsService.getAllArtists().subscribe((response) => {
      this.rowData = response
    })

    this.columnDefs = [
      {
        headerName: 'STT',
        valueGetter: (params) => params.node?.rowIndex != null ? params.node.rowIndex + 1 : null,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1,
      },
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1,
      },
      {
        headerName: 'Ngày tạo',
        field: 'created_at',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        valueFormatter: this.dateFormatter,
        flex: 1,
      },
      {
        headerName: 'Ngày cập nhật',
        field: 'updated_at',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        valueFormatter: this.dateFormatter,
        flex: 1,
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        sortable: true,
        filter: true,
        cellRenderer: StatusCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1,
      },
      {
        headerName: 'Chức năng',
        field: 'actions',
        cellRenderer: ArtistsCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1,
      },
    ];
  }

  dateFormatter(params: { value: string | number | Date; }) {
    const date = new Date(params.value);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  addArtists() {
    const dialogRef = this.matdialog.open(AddArtistsComponent, {
      width: '45vh',
      height: '45vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'addArtists') {
        this.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }
}
