import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { LocationSelectComponent } from '../location-select/location-select.component';
import { Location } from '../location';

enum Size {
  SuperBig = "Super Big",
  Enormous = "Enormous",
  Galaxy = "Galaxy"
}

@Component({
  selector: 'app-configuration',
  imports: [RouterModule, FormsModule, LocationSelectComponent, CommonModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  inventoryService: InventoryService = inject(InventoryService);
  locations: Location[] = this.inventoryService.locations;
  itemName: string = ""
  itemLocationID: number = -1
  itemSize: string =  ""
  locationSelect: Location | null = null


  locationName: string = ""
  locationDescription: string = ""
  width: number = 0
  height: number = 0

  // addItem(name: string, location: string) {
  addItem() {
    this.inventoryService.addItem(this.itemName,-1, this.itemLocationID, this.itemSize, "");
    this.itemLocationID = -1;
    this.itemName = "";
    this.itemSize = "";
  }

  addLocation() {
    this.inventoryService.addLocation(this.locationName, this.width, this.height, this.locationDescription);
    this.locationName = "";
    this.width = 0;
    this.height = 0;
  }
}
