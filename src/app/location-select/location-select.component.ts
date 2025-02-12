import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-select',
  imports: [FormsModule],
  templateUrl: './location-select.component.html',
  styleUrl: './location-select.component.css'
})
export class LocationSelectComponent {
  mycolumns: string = "25px 25px 25px 25px 25px 25px 25px 25px 25px 25px";
  rows: number[] = [...Array(10).keys()];
  columns: number[] = [...Array(10).keys()];
  selected: boolean[][] = new Array(new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false));
  firstCell: [number, number] | null = null;
  secondCell: [number, number] | null = null;
  constructor() {
  }

  fillCells(start: [number, number], end: [number, number]) {
    const startRow: number = start[0] <= end[0] ? start[0] : end[0];
    const endRow: number = start[0] >= end[0] ? start[0] : end[0];
    const startColumn: number = start[1] <= end[1] ? start[1] : end[1];
    const endColumn: number = start[1] >= end[1] ? start[1] : end[1];

    this.selected = new Array(new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false));
    for (let row = startRow; row <= endRow; row++) {
      for (let column = startColumn; column <= endColumn; column++) {
        this.selected[row][column] = true;
      } 
    }
  }

  selectCell(row: number, column: number) {
    if (this.firstCell !== null && this.secondCell !== null) {
      this.firstCell = [row, column];
      this.secondCell = null;
      this.fillCells(this.firstCell, this.firstCell);
    } else if (this.firstCell !== null && this.secondCell === null) {
      this.secondCell = [row, column];
      this.fillCells(this.firstCell, this.secondCell);
    } else if (this.firstCell === null && this.secondCell === null) {
      this.firstCell = [row, column];
      this.fillCells(this.firstCell, this.firstCell);
    }
  }
}
