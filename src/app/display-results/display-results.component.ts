import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Item} from '../item';
import { RouterModule } from '@angular/router';
// import {HousingLocation} from '../housinglocation';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-display-results',
  imports: [CommonModule, RouterModule],
  templateUrl: './display-results.component.html',
  styleUrl: './display-results.component.css'
})
export class DisplayResultsComponent {
  inventoryService: InventoryService = inject(InventoryService);
  
  constructor( /*private InventoryService:*/ ){
    this.filteredItems = this.inventoryService.getItems();
  }
  filter: string = "";
  search(filter: string) {
    const items = this.inventoryService.getItems();
    this.filteredItems = items.filter(item => item.name.includes(filter));
  };
  title = 'storage-organizer';
  
  // items: Item[] = [
  //   {id: 1,
  //   name: "truck",
  //   location: "garage",
  //   },
  //   {id: 2,
  //   name: "bike",
  //   location: "garage",
  //   },
  //   {id: 3,
  //   name: "lawnmower",
  //   location: "garage",
  //   },
  // ];
  filteredItems: Item[] = [];
}
