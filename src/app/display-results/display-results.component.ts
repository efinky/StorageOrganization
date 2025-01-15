import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Item} from '../item';
import { RouterModule } from '@angular/router';
// import {HousingLocation} from '../housinglocation';

@Component({
  selector: 'app-display-results',
  imports: [CommonModule, RouterModule],
  templateUrl: './display-results.component.html',
  styleUrl: './display-results.component.css'
})
export class DisplayResultsComponent {
  filter: string = "";
  search(filter: string) {
    
    this.filteredItems = this.items.filter(item => item.name.includes(filter));
  };
  title = 'storage-organizer';
  
  items: Item[] = [
    {id: 1,
    name: "truck",
    location: "garage",
    },
    {id: 2,
    name: "bike",
    location: "garage",
    },
    {id: 3,
    name: "lawnmower",
    location: "garage",
    },
  ];
  filteredItems: Item[] = this.items;
}
