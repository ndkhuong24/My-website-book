import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-author-cell-render',
  standalone: true,
  imports: [],
  templateUrl: './author-cell-render.component.html',
  styleUrl: './author-cell-render.component.scss'
})

export class AuthorCellRenderComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onRemoveClick() {

  }

  onStopSellingClick() {

  }
}
