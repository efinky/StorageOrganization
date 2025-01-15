import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Item } from './item';
import { DisplayResultsComponent } from './display-results/display-results.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DisplayResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
