import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AuthorService } from '../../service/author.service';
import { ColDef } from 'ag-grid-community';
import { AuthorCellRenderComponent } from './author-cell-render/author-cell-render.component';
import { StatusCellRenderComponent } from './author-cell-render/status-cell-render.component';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [AgGridModule, CommonModule, AuthorCellRenderComponent],
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})

export class AuthorComponent implements OnInit {
  isBrowser: boolean;
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  headerHeight: number = 38;
  rowHeight: number = 80;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authorService: AuthorService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initAgGrid();
    }
  }

  initAgGrid(): void {
    this.authorService.getAllAuthor().subscribe((response) => {
      this.rowData = response
    })

    this.columnDefs = [
      // {
      //   headerName: 'ID',
      //   field: 'id',
      //   sortable: true,
      //   filter: true,
      //   maxWidth: 70,
      //   cellStyle: { 'align-items': 'center', 'justify-content': 'center', 'display': 'flex' }
      // },
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      {
        headerName: 'Ảnh',
        field: 'profile_picture',
        cellRenderer: (params: { data: { profile_picture: any; }; }) => `<img height="100px" src="${params.data.profile_picture}">`,
        flex: 1
      },
      // {
      //   headerName: 'Bút danh',
      //   field: 'pen_name',
      //   sortable: true,
      //   filter: true,
      //   cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' }
      // },
      {
        headerName: 'Mô tả',
        field: 'bio',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      {
        headerName: 'Ngày sinh',
        field: 'birth_date',
        sortable: true,
        filter: true,
        valueGetter: (params) => this.formatDate(params.data.birth_date),
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      {
        headerName: 'Quốc gia',
        field: 'nationality',
        sortable: true,
        filter: true,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      // {
      //   headerName: 'Ngày tạo',
      //   field: 'created_at',
      //   sortable: true,
      //   filter: true,
      //   valueGetter: (params) => this.formatDateTime(params.data.created_at),
      //   cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' }
      // },
      // {
      //   headerName: 'Ngày sửa',
      //   field: 'updated_at',
      //   sortable: true,
      //   filter: true,
      //   valueGetter: (params) => this.formatDateTime(params.data.updated_at),
      //   cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' }
      // },
      {
        headerName: 'Trạng thái',
        field: 'status',
        sortable: true,
        filter: true,
        // valueGetter: (params: { data: { status: number; }; }) => {
        //   return params.data.status === 0 ? 'Hoạt động' : 'Ngừng hoạt động';
        // },
        cellRenderer: StatusCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
      {
        headerName: 'Chức năng',
        field: 'actions',
        cellRenderer: AuthorCellRenderComponent,
        cellStyle: { 'align-items': 'center', 'justify-content': 'middle', 'display': 'flex' },
        flex: 1
      },
    ];
  }

  formatDateTime(date: any): any {
    const dateObj = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    return dateObj.toLocaleString('vi-VN', options);
  }

  formatDate(date: string): any {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('vi-VN', options);
  }
}