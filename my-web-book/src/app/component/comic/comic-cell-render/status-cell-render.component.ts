import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'status-cell-renderer-comic',
  standalone: true,
  template: `
    <div class="tag {{ getTagClass() }}">
      <div class="circle {{ getCircleClass() }}"></div>
      <span>{{ valueFormatted }}</span>
    </div>
  `,
  styles: [
    `
      .tag {
        border-radius: 100px;
        padding-left: 4px;
        padding-right: 12px;
        line-height: 2;
        font-weight: 500;
        border: 1.5px solid rgba(91, 91, 91, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .activeTag {
        background-color: #84ca8130;
        border: 1.5px solid rgb(70, 227, 114, 0.2);
      }

      .inactiveTag {
        background-color: rgb(255, 0, 0, 0.05);
        color: rgb(234, 83, 83);
        border: 1.5px solid rgb(255, 0, 0, 0.3);
      }

      .circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 8px;
        margin-left: 6px;
      }

      .activeCircle {
        background-color: #6d9b7e;
      }

      .inactiveCircle {
        background-color: #ea5353;
      }
    `,
  ],
})

export class StatusCellRenderComponent implements ICellRendererAngularComp {
  public value: string = '';
  public valueFormatted: string = '';

  agInit(params: ICellRendererParams): void {
    this.value = this.getStatusValue(params.value);
    this.valueFormatted = this.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = this.getStatusValue(params.value);
    this.valueFormatted = this.value;
    return true;
  }

  private getStatusValue(value: number): string {
    switch (value) {
      case 1:
        return 'Hoạt động';
      case 0:
        return 'Không hoạt động';
      default:
        return 'Không xác định';
    }
  }

  getTagClass(): string {
    switch (this.value) {
      case 'Hoạt động':
        return 'activeTag';
      case 'Không hoạt động':
        return 'inactiveTag';
      default:
        return '';
    }
  }

  getCircleClass(): string {
    switch (this.value) {
      case 'Hoạt động':
        return 'activeCircle';
      case 'Không hoạt động':
        return 'inactiveCircle';
      default:
        return '';
    }
  }
}
