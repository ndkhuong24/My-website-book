import { ChangeDetectorRef, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CharactersService } from '../../../service/characters.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CharactersComponent } from '../characters.component';
import Swal from 'sweetalert2';
import { UpdateCharactersComponent } from '../update-characters/update-characters.component';

@Component({
  selector: 'app-characters-cell-render',
  standalone: true,
  imports: [],
  templateUrl: './characters-cell-render.component.html',
  styleUrl: './characters-cell-render.component.scss'
})
export class CharactersCellRenderComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private matdialog: MatDialog,
    private charactersService: CharactersService,
    private charactersComponent: CharactersComponent
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
        this.charactersService.deleteById(rowData.id).subscribe((response) => {
          if (response.message === 'Delete Characters successful!') {
            this.toastr.success('Xóa thành công', 'Thông báo');
            this.charactersComponent.ngOnInit();
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

    this.charactersService.getById(rowData.id).subscribe((response) => {
      const dialogRef = this.matdialog.open(UpdateCharactersComponent, {
        width: '45vh',
        height: '45vh',
        disableClose: true,
        data: response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updateCharacters') {
          this.charactersComponent.ngOnInit();
          this.cdr.detectChanges();
        }
      });
    });
  }

}
