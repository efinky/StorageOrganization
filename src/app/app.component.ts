import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RouterModule} from '@angular/router';
import { InventoryService } from './inventory.service';
import { Item } from './item';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  inventoryService: InventoryService = inject(InventoryService);
  items: Item[] = [];


  constructor( /*private InventoryService:*/ ){
    this.items = this.inventoryService.getItems();
  }
  filter: string = "";


  search(filter: string) {

    this.items = 
    this.filteredItems = this.items.filter(item => item.name.includes(filter));
  };
  title = 'storage-organizer';


  filteredItems: Item[] = this.items;
}