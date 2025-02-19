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
    //this.inventoryService.getItems().then(items => this.filteredItems = items);
  }
  filter: string = "";
  async search(filter: string) {
    this.inventoryService.convertDatabaseItem(this.inventoryService.getItemsByDescriptionorName(filter))
    console.log("here!!!")
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
