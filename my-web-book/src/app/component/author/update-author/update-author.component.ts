import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { AuthorService } from '../../../service/author.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthorComponent } from '../author.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-author',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './update-author.component.html',
  styleUrl: './update-author.component.scss'
})
export class UpdateAuthorComponent {
  author = {
    id: 0,
    name: "",
    pen_name: "",
    bio: "",
    birth_date: "",
    nationality: "",
    profile_picture: "",
    status: 0
  };

  status: boolean;
  imageFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  countries: string[] = ['Korea', 'English', 'Japan' , 'China'];
  selectedCountry: string = '';

  constructor(
    public dialogRef: MatDialogRef<UpdateAuthorComponent>,
    private authorService: AuthorService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.author = data;
    this.status = data.status;
    this.selectedCountry = data.nationality;
  }

  onStatusChange(event: boolean): void {
    this.status = event;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  updateAuthor(): void {
    const authorDataCurrent = {
      id: this.author.id,
      name: this.author.name,
      penName: this.author.pen_name,
      description: this.author.bio,
      birthDate: this.author.birth_date,
      selectedCountry: this.selectedCountry,
      status: this.status ? 1 : 0
    };

    this.authorService.updateAuthor(this.author.id, authorDataCurrent, this.imageFile).subscribe(
      (response) => {
        if (response && response.message) {
          if (response.message === 'Update Author successful!') {
            this.toastr.success('Thêm thành công', 'Thông báo');
            this.dialogRef.close("updateAuthor");
          } else {
            this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
          }
        } else {
          this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
        }
      },
      error => {
        this.toastr.error('Đã xảy ra lỗi', 'Thông báo');
      }
    );
  }
}
