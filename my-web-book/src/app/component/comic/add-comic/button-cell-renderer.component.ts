import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-button-cell-renderer',
    template: `
    <div class="buttonCell">
      <button class="button-secondary removeButton" (click)="onClick($event)">
        <img src="/example/inventory/delete.svg" alt="delete" />
      </button>
    </div>
  `,
    styles: [`
    .buttonCell {
      display: flex;
      gap: 8px;
      flex-direction: row-reverse;
    }

    .buttonCell button {
      appearance: none;
      display: inline-block;
      padding: 0.375em 1em 0.5em;
      white-space: nowrap;
      border-radius: 6px;
      box-shadow: 0 0 0 4px transparent, 0 1px 2px 0 #0c111d11;
      outline: none;
      background-color: var(--ag-background-color);
      color: var(--color-fg-primary, #101828);
      border: 1px solid var(--ag-border-color);
      cursor: pointer;
    }

    .removeButton {
      display: flex !important;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
    }

    .removeButton img {
      width: 20px;
    }

    .buttonStopSelling {
      height: 40px;
      line-height: 1.8;
    }
  `]
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp {
    private params: any;

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    refresh(params: ICellRendererParams): boolean {
        return false;
    }

    onClick($event: any) {
        if (this.params.onClick instanceof Function) {
            // Pass the row data to the callback function
            this.params.onClick(this.params.node.data);
        }
    }
}