// import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
// import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { AgGridModule } from 'ag-grid-angular';
// import { AuthorService } from '../../service/author.service';
// import { ColDef } from 'ag-grid-community';

// @Component({
//   selector: 'app-author',
//   standalone: true,
//   imports: [AgGridModule, CommonModule],
//   templateUrl: './author.component.html',
//   styleUrls: ['./author.component.scss']
// })

// export class AuthorComponent implements OnInit {
//   isBrowser: boolean;
//   rowData: any[] = [];
//   columnDefs: ColDef[] = [];
//   headerHeight: number = 50;
//   rowHeight: number = 40;

//   constructor(
//     @Inject(PLATFORM_ID) private platformId: Object,
//     private authorService: AuthorService,
//   ) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   ngOnInit(): void {
//     if (this.isBrowser) {
//       this.initAgGrid();
//     }
//   }

//   initAgGrid(): void {
//     this.authorService.getAllAuthor().subscribe((response) => {
//       console.log(response)
//       this.rowData = response
//     })

//     this.columnDefs = [
//       {
//         headerName: 'ID',
//         field: 'id',
//         sortable: true,
//         filter: true,
//         //  // flex: 1,
//         maxWidth: 70
//       },
//       {
//         headerName: 'Tên',
//         field: 'name',
//         sortable: true,
//         filter: true,
//          // flex: 1,
//       },
//       {
//         headerName: 'Bút danh',
//         field: 'pen_name',
//         sortable: true,
//         filter: true,
//          // flex: 1,
//       },
//       {
//         headerName: 'Mô tả',
//         field: 'bio',
//         sortable: true,
//         filter: true,
//          // flex: 1,
//       },
//       {
//         headerName: 'Ngày sinh',
//         field: 'birth_date',
//         sortable: true,
//         filter: true,
//          // flex: 1,
//         valueGetter: (params) => this.formatDate(params.data.birth_date),
//       },
//       {
//         headerName: 'Quốc gia',
//         field: 'nationality',
//         sortable: true,
//         filter: true,
//          // flex: 1,
//       },
//       {
//         headerName: 'Ngày tạo',
//         field: 'created_at',
//         sortable: true,
//         filter: true,
//          // flex: 1,
//         valueGetter: (params) => this.formatDateTime(params.data.created_at),
//       },
//       {
//         headerName: 'Ngày sửa',
//         field: 'updated_at',
//         sortable: true,
//         filter: true,
//          // flex: 1,
//         valueGetter: (params) => this.formatDateTime(params.data.updated_at),
//       },
//       {
//         headerName: 'Trạng thái',
//         field: 'status',
//         sortable: true,
//         filter: true,
//         valueGetter: (params: { data: { status: number; }; }) => {
//           return params.data.status === 0 ? 'Hoạt động' : 'Ngừng hoạt động';
//         },
//          // flex: 1,
//       },
//     ];
//   }

//   formatDateTime(date: any): any {
//     const dateObj = new Date(date);

//     // Define options to include both date and time
//     const options: Intl.DateTimeFormatOptions = {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: false 
//     };

//     // Format the date
//     return dateObj.toLocaleString('vi-VN', options);
//   }

//   formatDate(date: string): any {
//     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return new Date(date).toLocaleDateString('vi-VN', options);
//   }
// }

// import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ClientSideRowModelModule, ColDef, GetDetailRowDataParams, GridApi, GridReadyEvent, ModuleRegistry, SizeColumnsToFitGridStrategy, ValueFormatterFunc, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
// import { AgGridAngular } from 'ag-grid-angular';
// import { AuthorService } from '../../service/author.service';
// import { ProductCellRenderer } from './cell-renderer/product-cell-renderer.component';
// import { StatusCellRenderer } from './cell-renderer/status-cell-renderer.component';
// import { StockCellRenderer } from './cell-renderer/stock-cell-renderer.component';
// import { PriceCellRenderer } from './cell-renderer/price-cell-renderer.component';
// import { ActionsCellRenderer } from './cell-renderer/actions-cell-renderer.component';
// import { ExcelExportModule, MasterDetailModule, MultiFilterModule, SetFilterModule } from 'ag-grid-enterprise';

// ModuleRegistry.registerModules([
//   ClientSideRowModelModule,
//   ExcelExportModule,
//   SetFilterModule,
//   MultiFilterModule,
//   MasterDetailModule,
// ]);

// const statuses = {
//   all: 'Tất cả',
//   0: 'Hoạt động',
//   1: 'Ngừng hoạt động',
// };

// const statusFormatter: ValueFormatterFunc = ({ value }) =>
//   statuses[value as keyof typeof statuses] ?? '';

// @Component({
//   selector: 'inventory-example',
//   standalone: true,
//   imports: [
//     AgGridAngular,
//     FormsModule,
//     ProductCellRenderer,
//     StatusCellRenderer,
//     StockCellRenderer,
//     PriceCellRenderer,
//     ActionsCellRenderer,
//   ],
//   templateUrl: './author.component.html',
//   styleUrls: ['./author.component.scss'],
//   encapsulation: ViewEncapsulation.None,
// })
// export class AuthorComponent implements OnInit {
//   @Input() gridTheme: string = 'ag-theme-quartz';
//   @Input() isDarkMode: boolean = false;

//   private gridApi!: GridApi;
//   // private authorService!: AuthorService;

//   themeClass = `${this.gridTheme}${this.isDarkMode ? '-dark' : ''}`;

//   rowData: any[] = []; // Initialize rowData as an empty array

//   columnDefs = [
//     {
//       field: 'product',
//       headerName: 'Album Name',
//       cellRenderer: 'agGroupCellRenderer',
//       headerClass: 'header-product',
//       cellRendererParams: {
//         innerRenderer: ProductCellRenderer,
//       },
//       minWidth: 300,
//     },
//     { field: 'artist' },
//     { field: 'year', width: 150, headerClass: 'header-sku' },
//     {
//       field: 'status',
//       valueFormatter: statusFormatter,
//       cellRenderer: StatusCellRenderer,
//       filter: true,
//       filterParams: {
//         valueFormatter: statusFormatter,
//       },
//       headerClass: 'header-status',
//     },
//     {
//       field: 'inventory',
//       cellRenderer: StockCellRenderer,
//       headerClass: 'header-inventory',
//       sortable: false,
//     },
//     {
//       field: 'incoming',
//       cellEditorParams: {
//         precision: 0,
//         step: 1,
//         showStepperButtons: true,
//       },
//       editable: true,
//     },
//     {
//       field: 'price',
//       width: 120,
//       headerClass: 'header-price',
//       cellRenderer: PriceCellRenderer,
//     },
//     { field: 'sold', headerClass: 'header-calendar' },
//     {
//       headerName: 'Est. Profit',
//       colId: 'profit',
//       headerClass: 'header-percentage',
//       cellDataType: 'number',
//       valueGetter: ({ data: { price, sold } }: ValueGetterParams) =>
//         (price * sold) / 10,
//       valueFormatter: ({ value }: ValueFormatterParams) => `£${value}`,
//       width: 150,
//     },
//     { field: 'actions', cellRenderer: ActionsCellRenderer, minWidth: 194 },
//   ];

//   defaultColDef: ColDef = {
//     resizable: false,
//   };
//   autoSizeStrategy: SizeColumnsToFitGridStrategy = {
//     type: 'fitGridWidth',
//   };
//   detailCellRendererParams = {
//     detailGridOptions: {
//       columnDefs: [
//         { field: 'title', flex: 1.5 },
//         { field: 'available', maxWidth: 120 },
//         { field: 'format', flex: 2 },
//         { field: 'label', flex: 1 },
//         { field: 'country', flex: 0.66 },
//         {
//           field: 'cat',
//           headerName: 'Cat#',
//           type: 'rightAligned',
//           flex: 0.66,
//         },
//         { field: 'year', type: 'rightAligned', maxWidth: 80 },
//       ],
//       headerHeight: 38,
//     },
//     getDetailRowData: ({
//       successCallback,
//       data: { variantDetails },
//     }: GetDetailRowDataParams) => successCallback(variantDetails),
//   };
//   rowHeight = 80;
//   paginationPageSizeSelector = [5, 10, 20];
//   pagination = true;
//   paginationPageSize = 10;
//   masterDetail = true;
//   detailRowAutoHeight = true;

//   constructor(
//     private authorService: AuthorService
//   ) { }

//   ngOnInit(): void {
//     this.loadRowData();
//   }

//   loadRowData(): void {
//     this.authorService.getAllAuthor().subscribe((response) => {
//       this.rowData = response;
//     });
//   }

//   onGridReady(params: GridReadyEvent) {
//     this.gridApi = params.api;
//   }

//   statusEntries = Object.entries(statuses);
//   activeTab = 'all';
//   quickFilterText = '';

//   handleTabClick(status: string) {
//     if (status === 'all') {
//       this.gridApi.setColumnFilterModel('status', null);
//     } else {
//       this.gridApi.setColumnFilterModel('status', { values: [status] });
//     }
//     this.gridApi.onFilterChanged();
//     this.activeTab = status;
//   }

// }
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientSideRowModelModule, ColDef, GetDetailRowDataParams, GridApi, GridReadyEvent, ModuleRegistry, SizeColumnsToFitGridStrategy, ValueFormatterFunc, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthorService } from '../../service/author.service';
import { ProductCellRenderer } from './cell-renderer/product-cell-renderer.component';
import { StatusCellRenderer } from './cell-renderer/status-cell-renderer.component';
import { StockCellRenderer } from './cell-renderer/stock-cell-renderer.component';
import { PriceCellRenderer } from './cell-renderer/price-cell-renderer.component';
import { ActionsCellRenderer } from './cell-renderer/actions-cell-renderer.component';
import { ExcelExportModule, MasterDetailModule, MultiFilterModule, SetFilterModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  SetFilterModule,
  MultiFilterModule,
  MasterDetailModule,
]);

const statuses = {
  all: 'Tất cả',
  0: 'Hoạt động',
  1: 'Ngừng hoạt động',
};

const statusFormatter: ValueFormatterFunc = ({ value }) =>
  statuses[value as keyof typeof statuses] ?? '';

@Component({
  selector: 'inventory-example',
  standalone: true,
  imports: [
    AgGridAngular,
    FormsModule,
    ProductCellRenderer,
    StatusCellRenderer,
    StockCellRenderer,
    PriceCellRenderer,
    ActionsCellRenderer,
  ],
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthorComponent implements OnInit {
  @Input() gridTheme: string = 'ag-theme-quartz';
  @Input() isDarkMode: boolean = false;

  private gridApi!: GridApi;

  themeClass = `${this.gridTheme}${this.isDarkMode ? '-dark' : ''}`;

  rowData: any[] = []; // Initialize rowData as an empty array

  columnDefs = [
    {
      field: 'name',
      headerName: 'Tên',
      sortable: true,
      filter: true,
       // flex: 1,
    },
    {
      field: 'pen_name',
      headerName: 'Bút danh',
      sortable: true,
      filter: true,
       // flex: 1,
    },
    {
      field: 'bio',
      headerName: 'Mô tả',
      sortable: true,
      filter: true,
       // flex: 1,
    },
    {
      field: 'birth_date',
      headerName: 'Ngày sinh',
      sortable: true,
      filter: true,
       // flex: 1,
      valueGetter: (params: { data: { birth_date: string; }; }) => this.formatDate(params.data.birth_date),
    },
    {
      field: 'nationality',
      headerName: 'Quốc gia',
      sortable: true,
      filter: true,
       // flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Ngày tạo',
      sortable: true,
      filter: true,
       // flex: 1,
      valueGetter: (params: { data: { created_at: any; }; }) => this.formatDateTime(params.data.created_at),
    },
    {
      field: 'updated_at',
      headerName: 'Ngày sửa',
      sortable: true,
      filter: true,
       // flex: 1,
      valueGetter: (params: { data: { updated_at: any; }; }) => this.formatDateTime(params.data.updated_at),
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      valueFormatter: statusFormatter,
      sortable: true,
      filter: true,
       // flex: 1,
    },
  ];

  defaultColDef: ColDef = {
    resizable: false,
  };
  autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth',
  };
  detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        { field: 'title', flex: 1.5 },
        { field: 'available', maxWidth: 120 },
        { field: 'format', flex: 2 },
        { field: 'label', flex: 1 },
        { field: 'country', flex: 0.66 },
        {
          field: 'cat',
          headerName: 'Cat#',
          type: 'rightAligned',
          flex: 0.66,
        },
        { field: 'year', type: 'rightAligned', maxWidth: 80 },
      ],
      headerHeight: 38,
    },
    getDetailRowData: ({
      successCallback,
      data: { variantDetails },
    }: GetDetailRowDataParams) => successCallback(variantDetails),
  };
  rowHeight = 80;
  paginationPageSizeSelector = [5, 10, 20];
  pagination = true;
  paginationPageSize = 10;
  masterDetail = true;
  detailRowAutoHeight = true;

  constructor(
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.loadRowData();
  }

  loadRowData(): void {
    this.authorService.getAllAuthor().subscribe((response) => {
      this.rowData = response;
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  statusEntries = Object.entries(statuses);
  activeTab = 'all';
  quickFilterText = '';

  handleTabClick(status: string) {
    if (status === 'all') {
      this.gridApi.setColumnFilterModel('status', null);
    } else {
      this.gridApi.setColumnFilterModel('status', { values: [status] });
    }
    this.gridApi.onFilterChanged();
    this.activeTab = status;
  }

  formatDateTime(date: any): any {
    const dateObj = new Date(date);

    // Define options to include both date and time
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    // Format the date
    return dateObj.toLocaleString('vi-VN', options);
  }

  formatDate(date: string): any {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('vi-VN', options);
  }
}
