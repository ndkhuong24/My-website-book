import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CharactersService } from '../../service/characters.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { StatusCellRenderComponent } from './characters-cell-render/status-cell-render.component';
import { CharactersCellRenderComponent } from './characters-cell-render/characters-cell-render.component';
import { AddCharactersComponent } from './add-characters/add-characters.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [AgGridModule, CommonModule, MatDialogModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  isBrowser: boolean;
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  headerHeight: number = 38;
  rowHeight: number = 80;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private matdialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private charactersService: CharactersService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initAgGrid();
    }
  }

  initAgGrid() {
    this.charactersService.getAllCharacters().subscribe((response) => {
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
        cellRenderer: CharactersCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        
      },
    ];
  }

  addCharacters() {
    const dialogRef = this.matdialog.open(AddCharactersComponent, {
      width: '45vh',
      height: '45vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'addCharacters') {
        this.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }
}
