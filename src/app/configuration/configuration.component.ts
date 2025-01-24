import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { LocationSelectComponent } from '../location-select/location-select.component';

enum Size {
  SuperBig = "Super Big",
  Enormous = "Enormous",
  Galaxy = "Galaxy"
}

@Component({
  selector: 'app-configuration',
  imports: [RouterModule, FormsModule, LocationSelectComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  inventoryService: InventoryService = inject(InventoryService);

  itemName: string = ""
  itemLocationID: number = -1
  itemSize: string =  ""


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
