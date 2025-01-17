import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-configuration',
  imports: [RouterModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  inventoryService: InventoryService = inject(InventoryService);

  addItem(name: string, location: string) {
    this.inventoryService.add(name, location);
    
  }
}
