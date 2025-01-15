import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Item} from '../item';
// import {HousingLocation} from '../housinglocation';

@Component({
  selector: 'app-display-results',
  imports: [CommonModule],
  templateUrl: './display-results.component.html',
  styleUrl: './display-results.component.css'
})
export class DisplayResultsComponent {
  @Input() items!: Item[];
}
