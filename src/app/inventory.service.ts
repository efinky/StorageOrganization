import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  nextId: number;

  constructor() {
    this.nextId = Math.max(...this.items.map(item => item.id)) + 1;
  }

  getItems(): Item[] {
    return this.items;
  }

  add(name: string, location: string): void {
    const item: Item = {
      id: this.nextId,
      name: name,
      location: location
    };
    this.nextId++;
    this.items.push(item);
    console.log(this.items);
  }

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
}
