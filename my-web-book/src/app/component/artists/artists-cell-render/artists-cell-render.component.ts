import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ArtistsService } from '../../../service/artists.service';
import { ArtistsComponent } from '../artists.component';
import Swal from 'sweetalert2';
import { UpdateArtistsComponent } from '../update-artists/update-artists.component';

@Component({
  selector: 'app-artists-cell-render',
  standalone: true,
  imports: [],
  templateUrl: './artists-cell-render.component.html',
  styleUrl: './artists-cell-render.component.scss'
})
export class ArtistsCellRenderComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private matdialog: MatDialog,
    private artistsService: ArtistsService,
    private artistsComponent: ArtistsComponent
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
        this.artistsService.deleteById(rowData.id).subscribe((response) => {
          if (response.message === 'Delete Artists successful!') {
            this.toastr.success('Xóa thành công', 'Thông báo');
            this.artistsComponent.ngOnInit();
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

    this.artistsService.getById(rowData.id).subscribe((response) => {
      const dialogRef = this.matdialog.open(UpdateArtistsComponent, {
        width: '45vh',
        height: '45vh',
        disableClose: true,
        data: response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updateArtists') {
          this.artistsComponent.ngOnInit();
          this.cdr.detectChanges();
        }
      });
    });
  }

}
