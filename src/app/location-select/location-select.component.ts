import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '../location';


@Component({
  selector: 'app-location-select',
  imports: [FormsModule],
  templateUrl: './location-select.component.html',
  styleUrl: './location-select.component.css'
})
export class LocationSelectComponent {
  // @Input() selectedLocation!: Location | null;
  _selectedLocation: Location | null = null;
  mycolumns: string = "25px 25px 25px 25px 25px 25px 25px 25px 25px 25px";
  myrows: string = "25px 25px 25px 25px 25px 25px";
  rows: number[] = [...Array(10).keys()];
  columns: number[] = [...Array(10).keys()];
  selected: boolean[][] = new Array(new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false), new Array(false,false,false,false,false,false,false,false,false,false));
  firstCell: [number, number] | null = null;
  secondCell: [number, number] | null = null;
  constructor() {
    console.log("selectedLocation", this.selectedLocation);
  }

  @Input()
  set selectedLocation(value: Location | null) {
    this._selectedLocation = value;
    if (this._selectedLocation) {
      this.mycolumns = Array(this._selectedLocation.width).fill("25px").join(" ");
      this.myrows = Array(this._selectedLocation.height).fill("25px").join(" ");
      this.rows = [...Array(this._selectedLocation.height).keys()];
      this.columns = [...Array(this._selectedLocation.width).keys()];
      console.log("selectedLocation", this._selectedLocation);
    }
  }

  get selectedLocation(): Location | null {
    return this._selectedLocation;
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
